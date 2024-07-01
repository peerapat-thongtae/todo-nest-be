import { CreateTodoDto } from '../todo/dto/create-todo.dto';
import { UpdateTodoDto } from '../todo/dto/update-todo.dto';
import { Todo } from '../todo/entities/todo.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class TodoService {
  private todos: Todo[] = [];

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: string): Todo {
    const todo = this.todos.find((t) => t.id === id);
    if (!todo) {
      throw new NotFoundException(`This todo id ${id} is not found`);
    }
    return todo;
  }

  create(createTodoDto: CreateTodoDto): Todo {
    const newTodo: Todo = {
      id: randomUUID(),
      title: createTodoDto.title,
      description: createTodoDto.description,
      completed: false,
      created_at: new Date(),
      updated_at: new Date(),
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  update(id: string, updateTodoDto: UpdateTodoDto): Todo {
    const todo = this.findOne(id);

    if (updateTodoDto.title) {
      todo.title = updateTodoDto.title;
    }

    if (updateTodoDto.description) {
      todo.description = updateTodoDto.description;
    }

    if (updateTodoDto.completed) {
      todo.completed = updateTodoDto.completed;
    }

    todo.updated_at = new Date();
    return todo;
  }

  remove(id: string): void {
    const index = this.todos.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new NotFoundException(`This todo id ${id} is not found`);
    }
    this.todos.splice(index, 1);
  }
}
