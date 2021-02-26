/**
 * Responsible for assigning listeners to a locator location card
 */
class CardListenerAssigner {
  constructor ({ card }) {
    /**
     * An answers location card
     * 
     * @type {Answers.Component}
     */
    this.card = card;
  }

  /**
   * Add the listeners to the card
   */
  addListenersToCard () {
    this._addCardClickListener();
    this._addLinkFocusListeners();
  }

  /**
   * Set yxt-Card--pinFocused when the card is clicked
   */
  _addCardClickListener () {
    this.card._container.parentElement.addEventListener('click', () => {
      const index = this._getCardIndex();
      this._storeCardFocusIndex(index);
      this._removePinFocusFromAllCards();
      this._addPinFocusToCard();
    });
  }

  /**
   * Set yxt-Card--pinFocused when any HTML <a> element on the card gains focus.
   * These include cards titles and CTAs
   */
  _addLinkFocusListeners() {
    this.card._container.querySelectorAll('a').forEach((el) => {
      el.addEventListener('focus', () => {
        const index = this._getCardIndex();
        this._storeCardFocusIndex(index);
        this._removePinFocusFromAllCards();
        this._addPinFocusToCard();
      })
    });
  }

  /**
   * Get the index of the card
   * 
   * @returns {number}
   */
  _getCardIndex () {
    const { _index } = JSON.parse(this.card._container.parentElement.dataset.opts || {});
    return _index;
  }
  
  /**
   * Store the index in the ANSWERS storage as the focused locator card
   * 
   * @param {number} index 
   */
  _storeCardFocusIndex (index) {
    this.card.core.storage.set(HitchhikerJS.StorageKeys.LOCATOR_CARD_FOCUS, { index: index });
  }
  
  _removePinFocusFromAllCards () {
    document.querySelectorAll('.yxt-Card--pinFocused').forEach((el) => {
      el.classList.remove('yxt-Card--pinFocused');
    });
  }
  
  _addPinFocusToCard () {
    this.card._container.parentElement.classList.add('yxt-Card--pinFocused');
  }
}

export { CardListenerAssigner };