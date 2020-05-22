import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Res,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { CreateMensajeDto } from './dto/create-mensaje-dto';
import { MensajesService } from './mensajes.service';

@Controller('mensajes')
export class MensajesController {
  constructor(private mensajeService: MensajesService) {}

  @Post()
  create(@Body() createMensajeDto: CreateMensajeDto, @Res() response) {
    return this.mensajeService
      .createMensaje(createMensajeDto)
      .then(mensaje => {
        response.status(HttpStatus.CREATED).json(mensaje);
      })
      .catch(() => {
        response
          .status(HttpStatus.FORBIDDEN)
          .json({ mensaje: 'error en la creacion del mensaje' });
      });
  }

  @Get()
  getAll(@Res() response) {
    return this.mensajeService
      .getAll()
      .then(mensajesList => {
        response.status(HttpStatus.OK).json(mensajesList);
      })
      .catch(() => {
        response
          .status(HttpStatus.FORBIDDEN)
          .json({ mensaje: 'error en la obtencion de todos los mensajes' });
      });
  }

  @Put(':id')
  update(
    @Body() updateMensajeDto: CreateMensajeDto,
    @Res() response,
    @Param('id') idMensaje,
  ) {
    return this.mensajeService
      .updateMensaje(idMensaje, updateMensajeDto)
      .then(mensaje => {
        response.status(HttpStatus.OK).json(mensaje);
      })
      .catch(() => {
        response
          .status(HttpStatus.FORBIDDEN)
          .json({ mensaje: 'error en la actualizacion del mensaje' });
      });
  }

  @Delete(':id')
  delete(@Res() response, @Param('id') idMensaje) {
    return this.mensajeService
      .deleteMensaje(idMensaje)
      .then(mensajeEliminado => {
        response.status(HttpStatus.OK).json(mensajeEliminado);
      })
      .catch(() => {
        response
          .status(HttpStatus.FORBIDDEN)
          .json({ mensaje: 'error en la eliminacion del mensaje' });
      });
  }
}
