import { FCCCalculatorPage } from './app.po';

describe('fcc-calculator App', function() {
  let page: FCCCalculatorPage;

  beforeEach(() => {
    page = new FCCCalculatorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
