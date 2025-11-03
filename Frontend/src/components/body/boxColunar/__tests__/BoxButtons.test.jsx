import { render, screen } from '@testing-library/react';
import BoxButtons from '../BoxButtons';

describe('BoxButtons', () => {

    // Teste de propTypes
      it('valida propTypes corretamente', () => {
        // Teste com children válido
        expect(() =>
          render(
            <BoxButtons>
              <div>Test</div>
            </BoxButtons>
          )
        ).not.toThrow();
    
      });
    
      it('renderiza div com children', () => {
        render(
          <BoxButtons>
            <input type="text" defaultValue="Test" />
          </BoxButtons>
        );
        expect(screen.getByDisplayValue('Test')).toBeInTheDocument();
      });

});