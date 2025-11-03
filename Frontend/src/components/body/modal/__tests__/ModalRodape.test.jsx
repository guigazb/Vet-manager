import { render, screen } from '@testing-library/react';
import ModalRodape from '../ModalRodape';

describe('ModalRodape', () => {

  // Teste de propTypes
  it('valida propTypes corretamente', () => {
    // Teste com children válido
    expect(() =>
      render(
        <ModalRodape>
          <div>Test</div>
        </ModalRodape>
      )
    ).not.toThrow();

    // Teste sem children (deve falhar)
    //expect(() => render(<ModalRodape />)).toThrow(/children is marked as required/);
  });

  it('renderiza div com children', () => {
    render(
      <ModalRodape>
        <input type="text" defaultValue="Test" />
      </ModalRodape>
    );
    expect(screen.getByDisplayValue('Test')).toBeInTheDocument();
  });
});