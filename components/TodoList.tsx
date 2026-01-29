'use client';

import { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim() === '') return;
    
    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
      createdAt: new Date(),
    };
    
    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const completedCount = todos.filter(t => t.completed).length;
  const totalCount = todos.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            我的待办事项
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            高效管理您的任务
          </p>
        </div>

        {/* Add Todo Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6 transition-all hover:shadow-2xl">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              placeholder="需要做什么？"
              className="flex-1 px-5 py-3.5 bg-gray-50 dark:bg-gray-700 border-2 border-transparent focus:border-blue-500 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none transition-all text-lg"
            />
            <button
              onClick={addTodo}
              className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95 text-lg"
            >
              添加
            </button>
          </div>
        </div>

        {/* Stats */}
        {todos.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                已完成 {completedCount}/{totalCount} 个任务
              </p>
              {completedCount > 0 && (
                <button
                  onClick={clearCompleted}
                  className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
                >
                  清除已完成
                </button>
              )}
            </div>
            {/* Progress Bar */}
            <div className="mt-3 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-out"
                style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
              />
            </div>
          </div>
        )}

        {/* Todo Items */}
        <div className="space-y-3">
          {todos.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-gray-500 dark:text-gray-400 text-xl">
                还没有任务，在上面添加一个吧！
              </p>
            </div>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className={`group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all ${
                  todo.completed ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-center gap-4 p-4">
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all ${
                      todo.completed
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 border-transparent'
                        : 'border-gray-300 dark:border-gray-600 hover:border-blue-500'
                    }`}
                  >
                    {todo.completed && (
                      <svg className="w-4 h-4 text-white mx-auto mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                  
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-lg ${
                        todo.completed
                          ? 'line-through text-gray-400 dark:text-gray-500'
                          : 'text-gray-900 dark:text-white'
                      }`}
                    >
                      {todo.text}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      {todo.createdAt.toLocaleString()}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="opacity-0 group-hover:opacity-100 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {todos.length > 0 && (
          <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            双击编辑 • 悬停删除
          </div>
        )}
      </div>
    </div>
  );
}
