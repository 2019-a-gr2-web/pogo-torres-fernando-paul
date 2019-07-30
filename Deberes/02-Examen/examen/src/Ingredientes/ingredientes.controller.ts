import {Body, Controller, Get, Post, Render, Req, Res, Session} from "@nestjs/common";
import {IngredientesService} from "./ingredientes.service";
import {Ingrediente} from "../Interfaces/Ingrediente";
import {LoginService} from "../Login/login.service";
import {IngredientesEntity} from "./ingredientes.entity";
import {IngredientesCreateDto} from "./dto/ingredientes.create.dto";
import {validate, ValidationError} from "class-validator";
import {error} from "util";
import {Query} from "@nestjs/common/decorators/http/route-params.decorator";

@Controller('api/comida/gestion')
export class IngredientesController {
    constructor(private readonly _ingredientesService:IngredientesService,
                private  readonly _loginService:LoginService){

    }
    @Get(':idPadre')
    async gestionar(
        @Res() res,
        @Req() req,
        @Session() session
    ){
        console.log(Number(req.params.idPadre));

        try{

            const listaIngredientes= await this._ingredientesService.listarIngredientes(Number(req.params.idPadre));
            //if(this._loginService.validarCookies(req,res)){
            res.render('Administrador/gestionIngrediente.ejs',{
                //usuario:req.signedCookies.usuario,
                usuario:session.username,
                listaIngredientes:listaIngredientes,
                idPadre:Number(req.params.idPadre)
            });
            //}
        }
        catch (e) {
            console.error(e)
        }
    }

    @Get('crear/:idPadre')
    crear(
        @Res() res,
        @Req() req,
        @Query() query,
        @Session() session

    ){

        res.render('Administrador/crear-editar.ejs',{
            //usuario:req.signedCookies.usuario,
            usuario:session.username,
            idPadre:req.params.idPadre,
            mensaje:query.mensaje,
            campos:query.campos,
            nombre:query.nombre,
            cantidad:query.cantidad,
            descripcion:query.descripcion,
            opcional:query.opcional,
            refrigeracion:query.refrigeracion
        });
        //}
    }

    @Post('crear/:idPadre')
    async crearPost(
        @Res() res,
        @Body() ingrediente:IngredientesEntity,
        @Req() req
    ){
        ingrediente.descripcion=ingrediente.descripcion;
        ingrediente.comidaId=req.params.idPadre;
        ingrediente.cantidad=Number(ingrediente.cantidad);

        let ingredienteValidar=new IngredientesCreateDto()

        ingredienteValidar.nombre=ingrediente.nombre;
        ingredienteValidar.descripcion=ingrediente.descripcion;
        ingredienteValidar.cantidad=ingrediente.cantidad;
        ingredienteValidar.opcional=ingrediente.opcional;
        ingredienteValidar.refrigeracion=ingrediente.refrigeracion;
        ingredienteValidar.comidaId=ingrediente.comidaId;
        try{
            const errores=await validate(ingredienteValidar);
            if(errores.length>0){
                const valores= (<IngredientesCreateDto>errores[0].target)

                const campos=[]
                errores.forEach(value => {
                    console.log(value.property);
                    campos.push(value.property);
                });
                const inputs="&nombre="+valores.nombre+"&descripcion="+valores.descripcion+"&cantidad="+valores.cantidad+"&opcional="+valores.opcional+"&refrigeracion="+valores.refrigeracion
                res.redirect('/api/comida/gestion/crear/'+Number(req.params.idPadre)+"?mensaje=Complete los campos obligatorios "+inputs);
            }else{
                const  respuestaCrear=await this._ingredientesService.crear(ingrediente);
                res.redirect('/api/comida/gestion/'+Number(req.params.idPadre));
            }


        }catch (e) {
            //console.error(e);
            res.status(500);
            res.send({mensaje: 'Error', codigo: 500});
        }
    }

    @Post('eliminar/:idPadre')
    async eliminar(
        @Res () res,
        @Req () req,
        @Body('ingredienteId') ingredienteId:number
    ){

        try{
            const respuestaEliminar=await this._ingredientesService.eliminarPorId(ingredienteId);
            res.redirect('/api/comida/gestion/'+Number(req.params.idPadre));
        }catch (e) {
            console.error(e)
        }

    }

    @Post('editar/:idPadre')
    async editar(
        @Res () res,
        @Req () req,
        @Body('peliculaId') peliculaId:number,
        @Session() session
    ){

        try{

            res.render('Administrador/crear-editar.ejs',{
                user:session.username,
                idPadre:req.params.idPadre,

            });
        }catch (e) {
            console.error(e)
        }

    }

    @Post('buscar/:idPadre')
    async buscar(
        @Res() res,
        @Req() req,
        @Body() body,
        @Session() session
    ){

        console.log(body);


        try {
            const listaIngrediente=await this._ingredientesService.buscar(body.nombreBusqueda,body.descripcionBusqueda);
            res.render('Administrador/gestionIngrediente.ejs',{
                //usuario:req.signedCookies.usuario,
                user:session.username,
                listaIngrediente:listaIngrediente,
                idPadre:req.params.idPadre
            });
        }catch (e) {
            console.log(e)
        }
        //}
    }

    @Get('consultaIngrediente')
    async ingredientes(@Res() res,
                    @Req() req
    ){
        console.log(Number(req.params.idPadre));

        try{

            const listaIngrediente= await this._ingredientesService.listarTodo();

            console.log(listaIngrediente);
            res.render({
                listaIngrediente:listaIngrediente
            });

        }
        catch (e) {
            console.error(e)
        }
    }

    @Post('consultar-por-id/:pedido')
    //@Render ('api/menu')
    async consultar(
        @Req() req,
        @Body() body,
        @Session() session,
        @Res() res
    ){
        try{

            const listaIngrediente= await this._ingredientesService.listarIngredientes(Number(body.comidaId));
            console.log(listaIngrediente);
            res.redirect('/api/menu?pedido='+req.params.pedido+"&comida="+body.comidaId);
        }
        catch (e) {
            console.error(e)
        }
    }


}
