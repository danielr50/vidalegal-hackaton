import { VidalegalHackatonPage } from './app.po';

describe('vidalegal-hackaton App', () => {
  let page: VidalegalHackatonPage;

  beforeEach(() => {
    page = new VidalegalHackatonPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
