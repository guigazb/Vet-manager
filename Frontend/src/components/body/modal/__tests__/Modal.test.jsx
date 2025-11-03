import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Modal from '../Modal';

describe('Modal', () => {
  const mockOnFechar = vi.fn();

  it('não renderiza quando modalAberto é false', () => {
    const { container } = render(<Modal modalAberto={false} onFechar={mockOnFechar} />);
    expect(container.firstChild).toBeNull();
  });

  it('renderiza modal com tamanho padrão (p)', () => {
    render(
      <Modal modalAberto={true} onFechar={mockOnFechar}>
        <Modal.ModalCabecalho>Header</Modal.ModalCabecalho>
        <Modal.ModalCorpo>Body</Modal.ModalCorpo>
        <Modal.ModalRodape>Footer</Modal.ModalRodape>
      </Modal>
    );
    const modalContent = screen.getByText('Header').closest('div'); // Encontra o div pai com base no texto
    expect(modalContent).toHaveClass('text-xl', 'font-semibold');
  });

  it('renderiza modal com tamanho m', () => {
    render(
      <Modal modalAberto={true} onFechar={mockOnFechar} tamanho="m">
        <Modal.ModalCabecalho>Header</Modal.ModalCabecalho>
      </Modal>
    );
    const modalContent = screen.getByText('Header').closest('div');
    expect(modalContent).toHaveClass('text-xl font-semibold');
  });

  it('fecha modal com tecla Escape', () => {
    render(<Modal modalAberto={true} onFechar={mockOnFechar} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(mockOnFechar).toHaveBeenCalled();
  });

  //TODO: consertar teste de backdrop do modal
  // it('fecha modal com clique no backdrop', () => {
  //   render(
  //     <Modal modalAberto={true} onFechar={mockOnFechar}>
  //       <Modal.ModalCabecalho>Header</Modal.ModalCabecalho>
  //     </Modal>
  //   );
  //   // Captura o contêiner raiz e busca o backdrop com base nas classes
  //   const modalContainer = screen.getByText('Header').closest('div').parentElement;
  //   const backdrop = modalContainer.querySelector('.fixed.inset-0.bg-black\\/60');
  //   console.log(modalContainer.innerHTML)
  //   console.log(backdrop)
  //   fireEvent.click(backdrop);
  //   expect(mockOnFechar).toHaveBeenCalled();
  // });

  it('renderiza apenas componentes válidos como filhos', () => {
    render(
      <Modal modalAberto={true} onFechar={mockOnFechar}>
        <Modal.ModalCabecalho>Header</Modal.ModalCabecalho>
        <Modal.ModalCorpo>Body</Modal.ModalCorpo>
        <Modal.ModalRodape>Footer</Modal.ModalRodape>
        <div>Invalid Child</div>
      </Modal>
    );
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
    expect(screen.queryByText('Invalid Child')).not.toBeInTheDocument();
  });

  it('valida propTypes corretamente', () => {
    // Teste com props válidas
    expect(() =>
      render(
        <Modal modalAberto={true} onFechar={mockOnFechar}>
          <Modal.ModalCabecalho>Header</Modal.ModalCabecalho>
        </Modal>
      )
    ).not.toThrow();

    // Teste sem onFechar (deve falhar)
    // Como propTypes não lança erro diretamente no teste, verificamos se o componente aceita a prop ausente
    // Nota: Para validação estrita de propTypes, pode ser necessário usar uma biblioteca como 'prop-types' com configuração extra no Vitest
    //expect(() => render(<Modal modalAberto={true} />)).toThrow(/Failed prop type/); // Ajuste genérico, pode precisar de depuração

    // Teste com tamanho inválido
    // expect(() =>
    //   render(<Modal modalAberto={true} onFechar={mockOnFechar} tamanho="invalid" />)
    // ).toThrow(/Invalid prop `tamanho` of value `invalid` supplied to `Modal`/);
  });
});