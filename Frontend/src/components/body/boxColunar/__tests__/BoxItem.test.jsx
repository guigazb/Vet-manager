import { render, screen } from '@testing-library/react';
import BoxItem from '../BoxItem';

describe('BoxItem', () => {

  it('renderiza div com children', () => {
    render(
      <BoxItem loading={false}>
        <input type="text" defaultValue="Test" />
      </BoxItem>
    );
    expect(screen.getByDisplayValue('Test')).toBeInTheDocument();
  });

  // TODO: não está verificando exatamente a largura, corrigir.
  it('renderiza div com largura variável', () => {
    const largura = '500';
    render(
      <BoxItem largura={largura}>
        <input type="text" defaultValue="Test" />
      </BoxItem>
    );
    const input = screen.getByDisplayValue('Test'); // Captura o input
    const boxItemDiv = input.closest('div'); // Captura o div do BoxItem
    expect(boxItemDiv).toHaveClass(`p-4`); // Verifica as classes
    expect(screen.getByDisplayValue('Test')).toBeInTheDocument();
  });

});