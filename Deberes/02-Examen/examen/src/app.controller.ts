import {Body, Controller, Get, Post, Query, Req, Res, Session} from '@nestjs/common';
import { AppService } from './app.service';
import {ComidaService} from "./Comida/comida.service";
import {LoginService} from "./Login/login.service";
import {IngredientesService} from "./Ingredientes/ingredientes.service";
import {UserService} from "./User/user.service";
import {PedidoService} from "./Pedido/pedido.service";

@Controller('/api')
export class AppController {
  constructor(private readonly _loginService: LoginService,
              private readonly _comidaService:ComidaService,
              private readonly _appService: AppService,
              private readonly _ingredientesService: IngredientesService,
              private readonly _userService: UserService,
              private readonly _pedidoService: PedidoService) {}

  @Get()
  inicio(
      @Res() res,
      @Req() req,
      @Session() session
  ){
    res.redirect('/api/login')
  }

  @Get('login')
  login(
      @Res() res,
      @Req() req,
      @Session() session
  ){
    if(session.user){
      session.user.destroy();
    }

    res.cookie(
        'tipoRol',0,{
          signed:true
        }).render('login.ejs');
  }

  @Post('ingresar')
  ingresar(
      @Body() body,
      @Res() res
  ){
    console.log(body.tipoRol);
    res.cookie(
        'user',
        body.user,
        {
          signed:true
        }
    ).cookie(
        'tipoRol',
        body.tipoRol,{
          signed:true
        }
    ).redirect('/api/menu');
  }

  @Get('menu')
  async menu(
      @Res() res,
      @Req() req,
      @Session() session,
      @Query() query
  ){
    //if(this._loginService.validarCookies(req,res)){
    const rol= Number(req.signedCookies.tipoRol);
    switch (rol) {
      case 1:{
        try{
          const listaComidas= await this._comidaService.finAll();
          res.render('Administrador/menuAdministrador.ejs',{
            usuario:session.username,
            tipoRol:req.signedCookies.tipoRol,
            listaActores:listaComidas
          });
        }
        catch (e) {
          console.error(e)
        }
        break;
      }
      case 2:{
        try{
          const listaComidas= await this._comidaService.finAll();

          let listaIngredientes;
          if(req.query.actor){
            listaIngredientes=await this._ingredientesService.listarIngredientes(req.query.actor);
          }else {
            listaIngredientes=await this._ingredientesService.listarTodo();
          }

          let pedido=0;
          if(req.query.pedido){
            pedido=req.query.pedido;
          }

          let comida=0;
          if(req.query.actor){
            comida=req.query.actor
          }
          res.render('User/menu.ejs',{
            usuario:session.username,
            tipoRol:req.signedCookies.tipoRol,
            listaComidas:listaComidas,
            listaIngredientes:listaIngredientes,
            idPedido:pedido,
            idComida:comida
          });
        }
        catch (e) {
          console.error(e)
        }
        break;
      }
      case 3:{
        try{
          const listaPedidos= await this._pedidoService.listarPedidosDespacho();
          res.render('Despachador/menu.ejs',{
            usuario:session.username,
            tipoRol:req.signedCookies.tipoRol,
            listaPedidos:listaPedidos
          });
        }
        catch (e) {
          console.error(e)
        }
        break;
      }
      default :{
        res.redirect('/api/login');
      }
    }

    //}
  }

  @Get('gestionIngredientes')
  gestionPeliculas(
      @Res() res,
      @Session() session
  ){
    res.render('Administrador/gestionIngredientes.ejs')
  }

  @Post('autenticar')
  async postAutenticar(
      @Body() body,
      @Session() session,
      @Res() res
  ){
    try {
      const respuestaUser = await this._userService
          .buscarUser(body.user,body.password,body.tipoRol);
      console.log(respuestaUser);
      if(respuestaUser.length>0){
        session.username=body.user;
        res.cookie(
            'tipoRol',
            body.tipoRol,{
              signed:true
            }
        ).redirect('/api/menu')

      }else{
        console.log("datos incorrecto");
        res.redirect('/api/login');
      }
    }catch (e) {
      console.log(e)
    }

  }
}
