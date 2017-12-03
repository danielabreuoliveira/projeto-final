import { Angular2FullStackPage } from './app.po';

describe('projeto-distribuidora', () => {
  let page: Angular2FullStackPage;

  beforeEach(() => {
    page = new Angular2FullStackPage();
  });

  it('should display the navbar correctly', () => {
    page.navigateTo();
    expect(page.getNavbarElement(0)).toEqual('Home');
    expect(page.getNavbarElement(1)).toEqual('Clientes');
    expect(page.getNavbarElement(2)).toEqual('Vendas');
    expect(page.getNavbarElement(3)).toEqual('Produtos');
    expect(page.getNavbarElement(4)).toEqual('Login');
    expect(page.getNavbarElement(5)).toEqual('Register');
  });
});
