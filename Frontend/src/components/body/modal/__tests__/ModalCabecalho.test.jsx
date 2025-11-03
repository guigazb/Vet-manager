import { render, screen } from '@testing-library/react';
import ModalCabecalho from '../ModalCabecalho';

describe('ModalCabecalho', () => {

    // Teste de propTypes
      it('valida propTypes corretamente', () => {
        // Teste com children válido
        expect(() =>
          render(
            <ModalCabecalho>
              <div>Test</div>
            </ModalCabecalho>
          )
        ).not.toThrow();
    
      });
    
      it('renderiza div com children', () => {
        render(
          <ModalCabecalho>
            <input type="text" defaultValue="Test" />
          </ModalCabecalho>
        );
        expect(screen.getByDisplayValue('Test')).toBeInTheDocument();
      });

});