import { HonoPage } from './app.po';

describe('hono App', () => {
  let page: HonoPage;

  beforeEach(() => {
    page = new HonoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
