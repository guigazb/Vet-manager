// src/components/__tests__/ButtonComponent.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import ButtonComponent from '../ButtonComponent';

describe('ButtonComponent', () => {
  // Teste 1: Renderização básica
  it('renders button with correct text', () => {
    render(<ButtonComponent>Click me</ButtonComponent>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('min-w-[80px]');
    expect(screen.getByRole('button')).toHaveClass('bg-zinc-300'); // Estilo padrão
  });

  // Teste 2: Aplica classe correta para diferentes tipos
  it.each([
    ['primario', 'bg-blue-400'],
    ['secundario', 'bg-stone-200'],
    ['sucesso', 'bg-green-500'],
    ['alerta', 'bg-yellow-400'],
    ['perigo', 'bg-red-600'],
    ['cancelar', 'bg-fuchsia-300'],
    ['diversos', 'bg-emerald-300'],
    ['info', 'bg-lime-400'],
  ])('applies correct class for tipo=%s', (tipo, expectedClass) => {
    render(<ButtonComponent tipo={tipo}>Click me</ButtonComponent>);
    expect(screen.getByRole('button')).toHaveClass(expectedClass);
  });

  // Teste 3: Estado desabilitado
  it('renders disabled button with correct class', () => {
    render(<ButtonComponent desabilitado>Click me</ButtonComponent>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('bg-stone-200'); // Classe de desabilitado
  });

  // Teste 4: Chama onClick quando clicado
  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<ButtonComponent onClick={handleClick}>Click me</ButtonComponent>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
+
  // Teste 5: Não chama onClick quando desabilitado
  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(<ButtonComponent onClick={handleClick} desabilitado>Click me</ButtonComponent>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  // Teste 6: Aplica tipoBotao corretamente
  it.each([
    ['submit', 'submit'],
    ['button', 'button'],
  ])('sets button type to %s', (tipoBotao, expectedType) => {
    render(<ButtonComponent tipoBotao={tipoBotao}>Click me</ButtonComponent>);
    expect(screen.getByRole('button')).toHaveAttribute('type', expectedType);
  });

  // Teste 7: Aplica classe personalizada via className
  it('applies custom className', () => {
    render(<ButtonComponent className="custom-class">Click me</ButtonComponent>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });
});