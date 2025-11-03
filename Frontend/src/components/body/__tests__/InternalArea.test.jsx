import { render, screen } from '@testing-library/react';
import InternalArea from '../InternalArea';

describe('InternalArea', () => {

    it('exibe mensagem de carregamento (loading)', () => {
        render(<InternalArea loading={true} />);
        expect(screen.getByText('Carregando informações...')).toBeInTheDocument();
    });

    it('renderiza div com children', () => {
        render(
            <InternalArea>
                <input type="text" defaultValue="Test" />
            </InternalArea>
        );
        expect(screen.getByDisplayValue('Test')).toBeInTheDocument();
    });

    it('aceita diferentes cores de fundo', () => {
        render(
            <InternalArea bgcolor="bg-slate-100">
                <input type="text" defaultValue="Test" />
            </InternalArea>
        );
        const container = screen.getByDisplayValue('Test').closest('div'); // Encontra o div pai que recebe o bgcolor
        expect(container).toHaveClass('bg-slate-100'); // Verifica se a classe está presente
        expect(screen.getByDisplayValue('Test')).toBeInTheDocument();
    });
});