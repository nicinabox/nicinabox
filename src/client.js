const isMiddleButton = (e) => e.which === 4 || e.button === 1;

function n(selector) {
  return Array.from(document.querySelectorAll(selector));
}

function on(event, nodes, callback) {
  nodes.forEach((node) => {
    node.addEventListener(event, callback);
  });
}

function includesNode(target, nodes) {
  return Boolean(nodes.find((node) => node.isSameNode(target)));
}

function closest(element, selector) {
    if (!element || element === document) {
      return;
    }

    if (element.matches(selector)) {
        return element;
    }

  return closest(element.parentNode, selector);
}

function siblings(element, nodes) {
  return nodes.filter((node) => !element.isSameNode(node));
}

function main() {
  document.addEventListener("click", (e) => {
    if (isMiddleButton(e)) return;

    const { target } = e;

    if (closest(target, ".project-container")) {
      return;
    }

    n(".project-container").forEach((node) => {
      node.classList.remove("active");
    });
  });

  on("click", n(".project-container"), (e) => {
    const { currentTarget, target } = e;

    const link = closest(target, "a");
    if (link && !link.classList.contains("details")) {
        return;
    }

    e.preventDefault();

    const siblingContainers = siblings(currentTarget, n(".project-container"));

    siblingContainers.forEach((node) => {
      node.classList.remove("active");
    });

    currentTarget.classList.toggle("active");
  });
}

window.onload = main;
