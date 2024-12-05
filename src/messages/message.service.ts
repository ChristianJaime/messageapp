import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message-dto';

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(Message) private readonly messageRepository: Repository<Message>
    ) {}

    async getAll(): Promise<Message[]> {
        return await this.messageRepository.find();
    }

    async create(newMessage: CreateMessageDto): Promise<Message> {
        const message = this.messageRepository.create(newMessage);
        return await this.messageRepository.save(message);
    }

    async update(id: number, newMessage: CreateMessageDto): Promise<Message> {
        const message = await this.messageRepository.findOneBy({id});
        if (message) {
            message.nick = newMessage.nick;
            message.message = newMessage.message;
            return await this.messageRepository.save(message);
        }
    }

    async delete(id: number): Promise<any> {
        return await this.messageRepository.delete(id);
    }
}
