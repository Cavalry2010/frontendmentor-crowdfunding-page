"use strict";

class Mastercraft {
  backProjectBtn = document.querySelector(".back-project-btn");
  bookmarkBtn = document.querySelector(".bookmark-btn");
  closeModalBtn = document.querySelector(".close-modal");
  modal = document.querySelector(".modal");
  modalTiers = Array.from(document.querySelectorAll(".modal-tier"));
  moneyBacked = document.querySelector(".num-dollars");
  navBtn = document.querySelector(".nav-btn");
  navEl = document.querySelector(".nav-element");
  overlay = document.querySelector(".overlay");
  rewardTiers = document.querySelector(".reward-tiers-box");
  statusBar = document.querySelector(".status-bar").style;
  totalBackers = document.querySelector(".num-backers");

  constructor() {
    this.navBtn.addEventListener("click", this.toggleMobileNav.bind(this));
    this.backProjectBtn.addEventListener("click", this.showModal.bind(this));
    this.bookmarkBtn.addEventListener("click", this.toggleBookmark.bind(this));
    this.rewardTiers.addEventListener(
      "click",
      function (e) {
        this.showModalFromTierReward(e);
      }.bind(this)
    );
    this.closeModalBtn.addEventListener(
      "click",
      this.closeEverything.bind(this)
    );
    this.overlay.addEventListener("click", this.closeEverything.bind(this));
  }

  showModal() {
    this.modal.classList.remove("hidden");
    this.overlay.classList.remove("hidden");
    this.modalTiers.forEach((element) => {
      element.addEventListener(
        "click",
        function () {
          this.assignActiveTier(element);
        }.bind(this)
      );
    });
  }

  showModalFromTierReward(e) {
    const target = e.target;
    if (target.tagName !== "BUTTON") return;
    this.showModal();
    this.assignActiveTier(this.modalTiers[target.dataset.tier]);
  }

  assignActiveTier(element) {
    if (
      element.classList.contains("out-of-stock") ||
      element.classList.contains("active-tier")
    )
      return;
    this.modalTiers.forEach((element) => {
      element.classList.remove("active-tier");
      element.querySelector(".tier-form").classList.remove("invalid-input");
    });
    const tierForm = element.querySelector(".tier-form");
    element.classList.add("active-tier");
    tierForm.setAttribute("novalidate", "novalidate");
  }

  validateKeys(event) {
    const forbiddenKeys = ["e", "+", "-", "n", ".", ","];
    if (forbiddenKeys.includes(event.key)) event.preventDefault();
  }

  checkInput(form, minimum) {
    form.classList.remove("invalid-input");
    const input = form.querySelector("input");
    const value = Number(input.value);
    if (input.value !== "") {
      if (value === 0) {
        this.showError(form, "Can't be zero!");
        return false;
      }
      if (value >= minimum && value !== 0) {
        this.showSuccess(value);
      } else {
        this.showError(form, `Must be at least $${minimum}!`);
      }
    } else {
      this.showError(form, "Can't be empty!");
    }
    return false;
  }

  showError(form, message) {
    const formMessage = form.querySelector(".form-message");
    formMessage.textContent = message;
    form.classList.add("invalid-input");
  }

  showSuccess(value) {
    this.modal.classList.add("modal-transition");

    setTimeout(
      function () {
        this.modal.innerHTML = `
        <img class="success-icon" src="./images/icon-check.svg" alt="Success" />
        <h2 class="success-heading">Thanks for your support!</h2>
        <p class="success-text">
          Your pledge brings us one step closer to sharing Mastercraft Bamboo
          Monitor Riser worldwide. You will get an email once our campaign is
          completed.
        </p>
        <button class="btn success-btn" type="button">Got it!</button>`;
        this.modal.classList.add("modal--success");
        this.modal.classList.remove("modal-transition");
        this.addSuccessBtnHandler();
      }.bind(this),
      400
    );
    this.updateState(value);
  }

  addSuccessBtnHandler() {
    const successBtn = document.querySelector(".success-btn");
    successBtn.addEventListener("click", this.closeEverything.bind(this));
  }

  updateState(value) {
    const moneyBacked = parseInt(this.moneyBacked.textContent.replace(",", ""));
    const totalBackers = parseInt(
      this.totalBackers.textContent.replace(",", "")
    );
    this.moneyBacked.textContent = `${(moneyBacked + value).toLocaleString(
      "en-US"
    )}`;
    this.totalBackers.textContent = `${(totalBackers + 1).toLocaleString(
      "en-US"
    )}`;
    this.statusBar.setProperty(
      "--bar-width",
      `${(moneyBacked + value) / 1000}%`
    );
  }

  toggleMobileNav() {
    this.navEl.classList.toggle("open-nav");
    this.overlay.classList.toggle("hidden");
  }

  toggleBookmark() {
    this.bookmarkBtn.classList.toggle("bookmark-btn--bookmarked");
  }

  closeEverything() {
    this.modalTiers.forEach((element) => {
      element.classList.remove("active-tier");
      element.removeEventListener(
        "click",
        function () {
          this.assignActiveTier(element);
        }.bind(this)
      );
    });
    this.modal.classList.add("hidden");
    this.navEl.classList.remove("open-nav");
    this.overlay.classList.add("hidden");
  }
}

const app = new Mastercraft();
