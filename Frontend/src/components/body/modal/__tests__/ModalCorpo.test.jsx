import { render, screen } from '@testing-library/react';
import ModalCorpo from '../ModalCorpo';

describe('ModalCorpo', () => {

    // Teste de propTypes
      it('valida propTypes corretamente', () => {
        // Teste com children válido
        expect(() =>
          render(
            <ModalCorpo>
              <div>Test</div>
            </ModalCorpo>
          )
        ).not.toThrow();
    
      });
    
      it('renderiza div com children', () => {
        render(
          <ModalCorpo>
            <input type="text" defaultValue="Test" />
          </ModalCorpo>
        );
        expect(screen.getByDisplayValue('Test')).toBeInTheDocument();
      });

});