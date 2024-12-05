import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message-dto';
import { MessageService } from './message.service';


@Controller('messages')
export class MessageController {
    constructor(private readonly messageService: MessageService) {}

    @Post()
    async create(@Body() createMessageDto: CreateMessageDto, @Res() response) {
        this.messageService.create(createMessageDto)
        .then(
            message => { response.status(HttpStatus.CREATED).json(message)
        })
        .catch(
            () => { response.status(HttpStatus.FORBIDDEN).json({message: 'Error creating message'})
        });
    }

    @Get()
    getAll(@Res() response) {
        this.messageService.getAll()
        .then(messageList => {
            response.status(HttpStatus.OK).json(messageList)
        })
        .catch(
            () => { response.status(HttpStatus.FORBIDDEN).json({message: 'Error getting messages'})
        });
    }

    @Put()
    update(@Param('id') id: number, @Body() updateMessageDto: CreateMessageDto, @Res() response) {
        this.messageService.update(id, updateMessageDto)
        .then(
            message => { response.status(HttpStatus.OK).json(message) 
        })
        .catch(
            () => { response.status(HttpStatus.FORBIDDEN).json({message: 'Error updating message'})
        });
    }

    @Delete(':id')
    delete(@Param('id') id: number, @Res() response) {
        this.messageService.delete(id)
        .then(
            () => { response.status(HttpStatus.OK).json({message: `Message with id: ${id} deleted`}) 
        })
        .catch(
            () => { response.status(HttpStatus.FORBIDDEN).json({message: 'Error deleting message'})
        });
    }
}
