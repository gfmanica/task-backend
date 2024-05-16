import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { FindAllParams, TaskDto } from './task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  findAll(@Query() params: FindAllParams): TaskDto[] {
    return this.taskService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string): TaskDto {
    return this.taskService.findOne(id);
  }

  @Post()
  create(@Body() task: TaskDto): void {
    this.taskService.create(task);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() task: TaskDto): TaskDto {
    return this.taskService.update(id, task);
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    this.taskService.delete(id);
  }
}
