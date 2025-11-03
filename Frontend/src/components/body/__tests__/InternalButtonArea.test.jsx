import { render, screen } from '@testing-library/react';
import InternalButtonArea from '../InternalButtonArea';

describe('InternalButtonArea', () => {

  it('exibe mensagem de carregamento (loading)', () => {
    render(<InternalButtonArea loading={true} />);
    expect(screen.getByText('Carregando área de botões...')).toBeInTheDocument();
  });

  it('renderiza div com children', () => {
    render(
      <InternalButtonArea>
        <input type="text" defaultValue="Test" />
      </InternalButtonArea>
    );
    expect(screen.getByDisplayValue('Test')).toBeInTheDocument();
  });
});