const assert = require('assert');
const loginPage = require('../pages/login.page');
const rosterPage = require('../pages/roster.page');

describe('Roster Test Suite', () => {
  var email = '1@2.com';
  var password = 'password';

  beforeEach(() => {
    browser.url('');
    loginPage.login(email, password);
  });

  it('should have default values', () => {
    let title = 'Build Your Superhero Roster:';
    let instructions =
      'Imagine that you are tasked with building a team of Superheros to save the world. We have given you a few heroes to start with. Add as many heroes as you would like to round out your dream team.';

    assert.strictEqual(rosterPage.instructions.getText(), instructions, 'Instructions text is not the same');
    assert.strictEqual(rosterPage.heroListTitle.getText(), title, 'Title is not the same');
    assert.strictEqual(rosterPage.addHeroLabel.getText(), 'ADD A SUPERHERO', 'Add hero label text is not the same');
    assert.strictEqual(
      rosterPage.addHeroField.getAttribute('placeholder'),
      'Enter Hero',
      'Placeholder attribute is not the same'
    );

    let heros = ['Wolverine', 'Iron Man', 'Deadpool', 'Thor', 'Spider-Man'];
    for (let i = 0; i < heros.length; i++) {
      assert.strictEqual(rosterPage.heroItem(i + 1).getText(), heros[i], heros[i] + ' text is not the same');
    }
  });

  it('should add a new hero', () => {
    let herosQuantity = rosterPage.heroList.length + 1;

    let hero = 'Bob';
    rosterPage.addHero(hero);

    assert.strictEqual(rosterPage.heroItem(herosQuantity).getText(), hero, hero + ' text is not the same');
  });

  it('should create multiple heros', () => {
    let heros = ['Captain America', 'Hulk', 'Flash', 'Batman', 'Super-Man'];
    for (let i = 0; i < heros.length; i++) {
      rosterPage.addHero(heros[i]);
      assert.strictEqual(rosterPage.heroItem(i + 6).getText(), heros[i], heros[i] + ' text is not the same');
    }
  });
});
