import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import FormPadrao from '../FormPadrao';

describe('FormPadrao', () => {
  const mockSubmit = vi.fn();
  const ref = { current: null };

  it('renderiza form com children', () => {
    render(
      <FormPadrao onSubmit={mockSubmit} Ref={ref} idForm="testForm">
        <input type="text" defaultValue="Test" />
      </FormPadrao>
    );
    expect(screen.getByDisplayValue('Test')).toBeInTheDocument();
    expect(screen.getByRole('form')).toHaveAttribute('id', 'testForm');
  });

  it('chama onSubmit quando o form é submetido', () => {
    render(
      <FormPadrao onSubmit={mockSubmit} Ref={ref} idForm="testForm">
        <button type="submit">Submit</button>
      </FormPadrao>
    );
    fireEvent.submit(screen.getByRole('form'));
    expect(mockSubmit).toHaveBeenCalled();
  });
});