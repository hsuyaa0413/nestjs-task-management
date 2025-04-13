import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}
  // // methods
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;

  //   let tasks = this.getAllTasks();

  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }

  //   if (search) {
  //     const lowerCaseSearch = search.toLowerCase();

  //     tasks = tasks.filter(
  //       (task) =>
  //         task.title.toLowerCase().includes(lowerCaseSearch) ||
  //         task.description.toLowerCase().includes(lowerCaseSearch),
  //     );
  //   }

  //   return tasks;
  // }

  async getTaskById(id: string): Promise<Task> {
    const foundTask = await this.tasksRepository.findOneBy({ id });
    if (!foundTask)
      throw new NotFoundException(`Task with id - '${id}' not found!`);

    return foundTask;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.tasksRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.tasksRepository.save(task);
    return task;
  }

  // deleteTask(id: string): void {
  //   const foundTask = this.getTaskById(id) as Task;
  //   this.tasks = this.tasks.filter((task) => task.id !== foundTask.id);
  // }

  // updateTaskStatus(id: string, status: TaskStatus): Task | undefined {
  //   const task = this.getTaskById(id);

  //   if (task) task.status = status;
  //   return task;
  // }
}
