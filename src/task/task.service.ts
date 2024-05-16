import { Injectable, NotFoundException } from '@nestjs/common';
import { FindAllParams, TaskDto } from './task.dto';

@Injectable()
export class TaskService {
  private tasks: TaskDto[] = [];

  findAll(params: FindAllParams): TaskDto[] {
    return this.tasks.filter((task) => {
      let match = true;

      if (params.title && !params.title.includes(task.title)) {
        match = false;
      }

      if (
        params.description &&
        !task.description.includes(params.description)
      ) {
        match = false;
      }

      if (params.status && task.status !== params.status) {
        match = false;
      }

      if (params.expirationDt && task.expirationDt !== params.expirationDt) {
        match = false;
      }

      return match;
    });
  }

  findOne(id: string): TaskDto {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  create(task: TaskDto): void {
    this.tasks.push(task);
  }

  update(id: string, task: TaskDto): TaskDto {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    this.tasks[taskIndex] = task;

    return task;
  }

  delete(id: string): void {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    this.tasks.splice(taskIndex, 1);
  }
}
