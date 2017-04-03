import { CrudClientPage } from './app.po';

describe('Client App', () => {
  let page: CrudClientPage;

  beforeEach(() => {
    page = new CrudClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
