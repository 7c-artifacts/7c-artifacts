import 'regenerator-runtime/runtime'
import { MDCCheckbox } from '@material/checkbox';
import { MDCDialog } from '@material/dialog';
import { MDCDrawer } from '@material/drawer';
import { MDCFloatingLabel } from '@material/floating-label';
import { MDCFormField } from '@material/form-field';
import { MDCIconButtonToggle } from '@material/icon-button';
import { MDCLinearProgress } from '@material/linear-progress';
import { MDCLineRipple } from '@material/line-ripple';
import { MDCList } from '@material/list';
import { MDCMenu } from '@material/menu';
import { MDCRadio } from '@material/radio';
import { MDCRipple } from '@material/ripple/index';
import { MDCSelect } from '@material/select';
import { MDCSelectIcon } from '@material/select/icon';
//import {MDCSlider} from '@material/slider';
import { MDCSnackbar } from '@material/snackbar';
import { MDCSwitch } from '@material/switch';
import { MDCTabBar } from '@material/tab-bar';
import { MDCTextField } from '@material/textfield';
//import {MDCTextFieldHelperText} from '@material/textfield/helper-text';
import { MDCTopAppBar } from '@material/top-app-bar';
import { MDCTooltip } from '@material/tooltip';
//import {MDCDataTable} from '@material/data-table';
import { extract } from 'oembed-parser'

if (document.getElementById('internetConnection')) {
  document.getElementById('internetConnection').innerHTML = `<div class="mdc-dialog" id="internetConnectionDialog"><div class="mdc-dialog__container"><div class="mdc-dialog__surface" aria-modal="true"><div class="mdc-dialog__content">It looks like you do not have a good internet connection. Some features may not be available.</div><div class="mdc-dialog__actions"><button type="button" class="mdc-button mdc-dialog__button" data-mdc-dialog-action="ok"><span class="mdc-button__ripple"></span><span cla
  ss="mdc-button__label">OK</span></button></div></div></div><div class="mdc-dialog__scrim"></div></div>`;
  const internetConnectionDialog = new MDCDialog(document.getElementById('internetConnectionDialog'));
  function notifyWebConnection() {
    internetConnectionDialog.open();
  }
  if (!window.navigator.onLine) {
    notifyWebConnection()
  }
  window.onoffline = notifyWebConnection;
}
if (document.querySelector("[data-open-dialog]")) {
  for (var t = 0; t < document.querySelectorAll('[data-open-dialog]').length; t++) {
    let dialog = new MDCDialog(
      document.getElementById(
        document.querySelectorAll('[data-open-dialog]')[t].getAttribute('data-open-dialog')
      )
    );
    document.querySelectorAll('[data-open-dialog]')[t].onclick = function () {
      dialog.open();
    }
  }
}
if (document.querySelector('.mdc-top-app-bar')) {
  const topAppBar = new MDCTopAppBar(document.querySelector('.mdc-top-app-bar'));
  topAppBar.setScrollTarget(document.querySelector('.mdc-drawer-app-content'));
  if (document.querySelector('.mdc-drawer')) {
    const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
    topAppBar.listen('MDCTopAppBar:nav', () => {
      drawer.open = !drawer.open;
    });
  }
}
var radios = [].map.call(
  document.querySelectorAll(".mdc-radio"),
  function (el) {
    return new MDCRadio(el);
  }
);
var checkboxes = [].map.call(
  document.querySelectorAll(".mdc-checkbox"),
  function (el) {
    return new MDCCheckbox(el);
  }
);
for (var i = 0; i < document.querySelectorAll(".mdc-form-field").length; i++) {
  var formfield = new MDCFormField(
    document.querySelectorAll(".mdc-form-field")[i]
  );
  if (
    document
      .querySelectorAll(".mdc-form-field")
    [i].querySelectorAll(".mdc-radio").length == 1
  ) {
    let radio = new MDCRadio(
      document
        .querySelectorAll(".mdc-form-field")
      [i].querySelector(".mdc-radio")
    );
    formfield.input = radio;
  } else if (
    document
      .querySelectorAll(".mdc-form-field")
    [i].querySelectorAll(".mdc-checkbox").length == 1
  ) {
    let checkbox = new MDCCheckbox(
      document
        .querySelectorAll(".mdc-form-field")
      [i].querySelector(".mdc-checkbox")
    );
    formfield.input = checkbox;
  }
}
[].map.call(document.querySelectorAll(".mdc-linear-progress"), function (
  el
) {
  return new MDCLinearProgress(el);
});
[].map.call(document.querySelectorAll(".mdc-button"), function (
  el
) {
  return new MDCRipple(el);
});
[].map.call(document.querySelectorAll(".mdc-card__primary-action"), function (
  el
) {
  return new MDCRipple(el);
});
[].map.call(document.querySelectorAll(".mdc-icon-button"), function (
  el
) {
  let ripple = new MDCRipple(el);
  ripple.unbounded = true;
});
[].map.call(document.querySelectorAll(".mdc-icon-button[data-toggle]"), function (
  el
) {
  let toggle = new MDCIconButtonToggle(el);
});
[].map.call(document.querySelectorAll(".mdc-fab"), function (
  el
) {
  return new MDCRipple(el);
});
var selects = [].map.call(
  document.querySelectorAll(".mdc-select"),
  function (el) {
    return new MDCSelect(el);
  }
);
var switches = [].map.call(
  document.querySelectorAll(".mdc-switch"),
  function (el) {
    return new MDCSwitch(el);
  }
);
var textfields = [].map.call(
  document.querySelectorAll(".mdc-text-field"),
  function (el) {
    return new MDCTextField(el);
  }
);
var tabs = [].map.call(
  document.querySelectorAll(".mdc-tab-bar"),
  function (el) {
    return new MDCTabBar(el);
  }
);
for (var i = 0; i < document.querySelectorAll("[title]:not([data-no-tooltip-title])").length; i++) {
  let tooltip = document.createElement('div');
  tooltip.setAttribute("class", "mdc-tooltip");
  tooltip.setAttribute("role", "tooltip");
  tooltip.setAttribute("aria-hidden", "true");
  let tooltipId = 'title-tooltip-' + i;
  tooltip.setAttribute("id", tooltipId);
  let tooltipChild = document.createElement('div');
  tooltipChild.setAttribute("class", "mdc-tooltip__surface");
  tooltip.appendChild(tooltipChild);
  let tooltipContent = document.createTextNode(document.querySelectorAll("[title]:not([data-no-tooltip-title])")[i].title);
  tooltipChild.appendChild(tooltipContent);
  document.body.appendChild(tooltip);
  document.querySelectorAll("[title]:not([data-no-tooltip-title])")[i].setAttribute("aria-describedby", tooltipId);
  document.querySelectorAll("[title]:not([data-no-tooltip-title])")[i].title = '';
}
for (var i = 0; i < document.querySelectorAll(".mdc-tooltip").length; i++) {
  var tooltip = new MDCTooltip(
    document.querySelectorAll(".mdc-tooltip")[i]
  );
  document.querySelectorAll("[aria-describedby],[data-tooltip-id]")[i].onmouseover = function () {
    for (var i = 0; i < document.querySelectorAll(".mdc-tooltip").length; i++) {
      document.querySelectorAll(".mdc-tooltip")[i].classList.remove("mdc-tooltip--shown");
      document.querySelectorAll(".mdc-tooltip")[i].classList.add("mdc-tooltip--hide", "mdc-tooltip--hide-transition");
    }
  }
}
for (var t = 0; t < document.querySelectorAll('.underlined').length; t++) {
  document.querySelectorAll('.underlined')[t].parentElement.addEventListener("mousedown", function (event) {
    this.querySelector('.inputfocus').style.transformOrigin = (event.pageX - this.getBoundingClientRect().x) + 'px center 0';
  });
}
document.onload = function () { console.clear(); }
if (document.querySelector(".mdc-snackbar")) {
  var snackbar = new MDCSnackbar(document.querySelector(".mdc-snackbar"));
  if (document.querySelector(".mdc-snackbar[data-check-form]")) {
    document.querySelector('button[type="submit"]').onclick = function () {
      if (!document.querySelector('form').checkValidity()) {
        snackbar.open();
      }
    }
    if (new URLSearchParams(window.location.search).get('invalid') == 'true') {
      snackbar.open();
    }
  } else {
    snackbar.open();
  }
}
for (var t = 0; t < document.querySelectorAll('.mdc-menu-surface--anchor').length; t++) {
  let menu = new MDCMenu(document.querySelectorAll('.mdc-menu-surface--anchor')[t].querySelector('.mdc-menu'));
  document.querySelectorAll('.mdc-menu-surface--anchor')[t].querySelector('button').onclick = function () {
    menu.open = true;
  }
}
for (var i = 0; i < document.querySelectorAll("a").length; i++) {
  document.querySelectorAll("a")[i].draggable = false;
}
import "app-datepicker/dist/app-datepicker";

if (document.querySelector('#embed')) {
  const url = 'https://codepen.io/Mamboleoo/pen/XWJPxpZ'
  extract(url).then((oembed) => {
    document.querySelector('#embed').innerHTML = oembed
  }).catch((err) => {
    document.querySelector('#embed').innerHTML = err
  })
}