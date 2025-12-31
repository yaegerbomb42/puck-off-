// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock Canvas getContext
HTMLCanvasElement.prototype.getContext = () => {
  return {
    fillStyle: '',
    fillRect: jest.fn(),
    save: jest.fn(),
    translate: jest.fn(),
    beginPath: jest.fn(),
    arc: jest.fn(),
    fill: jest.fn(),
    lineWidth: 0,
    strokeStyle: '',
    stroke: jest.fn(),
    restore: jest.fn(),
    clearRect: jest.fn(),
  };
};
