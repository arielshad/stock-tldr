/**
 * Buy Me a Coffee CTA. Rendered as a plain styled <a> rather than the
 * official BMC widget script because `document.currentScript` is null
 * for dynamically `appendChild`-ed scripts, so the widget can't find
 * itself in the DOM and silently fails to render. Rolling our own
 * keeps the BMC color palette (#FF5F5F red, #FFDD00 coffee, Cookie
 * font, ☕ emoji) so the button still reads as "the BMC CTA" at a
 * glance while rendering instantly, prerendering cleanly, and being
 * fully controllable in CSS.
 */
import { track } from "../lib/analytics";

export function BuyMeCoffee() {
  return (
    <a
      className="bmc"
      href="https://buymeacoffee.com/silver_d"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Buy me a coffee"
      title="Buy me a coffee"
      onClick={() => track("bmc:click")}
    >
      <img className="bmc-img" src="/coffee.png" alt="" aria-hidden="true" />
      <span className="bmc-text">Buy me a coffee</span>
    </a>
  );
}
