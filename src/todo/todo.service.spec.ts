import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from 'src/todo/dto/create-todo.dto';
import { UpdateTodoDto } from 'src/todo/dto/update-todo.dto';

describe('TodoService', () => {
  let service: TodoService;
  const createPayload: CreateTodoDto = {
    title: 'Test',
    description: 'Desc',
  };

  const updatePayload: UpdateTodoDto = {
    completed: true,
  };
  const mockIdNotfound = '21312414214e123';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoService],
    }).compile();

    service = module.get<TodoService>(TodoService);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  // Find all
  it('Should found all todos', () => {
    service.create(createPayload);
    const todos = service.findAll();
    expect(todos.length).toBe(1);
  });
  // Find all

  // Find one
  it('Should found todo by id', () => {
    const todo = service.create(createPayload);
    const foundTodo = service.findOne(todo.id);
    expect(foundTodo).toEqual(todo);
  });
  it('Should error when find todo id not found', () => {
    expect(() => service.findOne(mockIdNotfound)).toThrow(NotFoundException);
  });
  // Find one

  // Create
  it('Should created a todo', () => {
    const todo = service.create(createPayload);
    expect(todo.title).toBe(createPayload.title);
    expect(todo.description).toBe(createPayload.description);
    expect(todo.completed).toBe(false);
  });
  // Create

  // Update
  it('Should updated a todo by id', () => {
    const todo = service.create(createPayload);
    const updatedTodo = service.update(todo.id, {
      title: 'TestUpdate',
      completed: true,
    });
    expect(todo.title).toBe(updatedTodo.title);
    expect(todo.description).toBe(updatedTodo.description);
    expect(todo.completed).toBe(updatedTodo.completed);
  });
  it('Should error when update todo id not found', () => {
    expect(() => service.update(mockIdNotfound, updatePayload)).toThrow(
      NotFoundException,
    );
  });
  // Update

  // Delete
  it('Should deleted a todo by id', () => {
    const todo = service.create(createPayload);
    service.remove(todo.id);
    expect(service.findAll().length).toBe(0);
  });

  it('Should throw an error when delete todo by id not found', () => {
    expect(() => service.remove(mockIdNotfound)).toThrow(NotFoundException);
  });
  // Delete
});
