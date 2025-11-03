import { render, screen } from '@testing-library/react';
import BoxColunar from '../BoxColunar';
import BoxItem from '../BoxItem';

describe('BoxColunar', () => {

  it('exibe mensagem de carregamento (loading)', () => {
    render(<BoxColunar loading={true} />);
    expect(screen.getByText('Carregando informações...')).toBeInTheDocument();
  });

  it('renderiza div com children', () => {
    render(
      <BoxColunar loading={false}>
        <BoxItem>
          <input type="text" defaultValue="Test" />
        </BoxItem>
      </BoxColunar>
    );
    expect(screen.getByDisplayValue('Test')).toBeInTheDocument();
  });

  it('renderiza div com altura variável', () => {
    const altura = '500';
    render(
      <BoxColunar loading={false} altura={altura}>
        <BoxItem>
          <input type="text" defaultValue="Test" />
        </BoxItem>
      </BoxColunar>
    );
    const input = screen.getByDisplayValue('Test'); // Captura o input
    const boxItemDiv = input.closest('div'); // Captura o div do BoxItem
    const container = boxItemDiv.parentElement; // Captura o div pai do BoxItem (gerado pelo BoxColunar)
    expect(container).toHaveClass(`flex h-[${altura}px] rounded-lg bg-gray-100`); // Verifica as classes
    expect(screen.getByDisplayValue('Test')).toBeInTheDocument();
  });

  it('renderiza div com cor variável', () => {
    render(
      <BoxColunar loading={false} bgcolor="bg-gray-200">
        <BoxItem>
          <input type="text" defaultValue="Test" />
        </BoxItem>
      </BoxColunar>
    );
    const input = screen.getByDisplayValue('Test'); // Captura o input
    const boxItemDiv = input.closest('div'); // Captura o div do BoxItem
    const container = boxItemDiv.parentElement; // Captura o div pai do BoxItem (gerado pelo BoxColunar)
    expect(container).toHaveClass(`flex h-[400px] rounded-lg bg-gray-200`); // Verifica as classes
  });

});