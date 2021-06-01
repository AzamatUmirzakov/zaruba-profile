document.addEventListener("DOMContentLoaded", () => {
  let nav = document.querySelector("nav.sidebar-nav");
  //   .dispatchEvent(new Event("click"));

  nav.addEventListener("click", (e) => {
    if (e.target.tagName != "A") return false;
    let href = String(e.target.href);
    let needed = href.slice(href.indexOf("#"), href.length);
    for (let block of document.querySelectorAll(".content-block")) {
      block.style.display = "none";
    }
    nav.querySelector(".active").classList.remove("active");
    e.target.className = "active";
    if (needed == "#") {
      document.querySelector("div.content-block.profile-block").style.display =
        "block";
    } else if (needed == "#balance") {
      document.querySelector("div.content-block.balance").style.display =
        "block";
      document.querySelector(
        "div.content-block.balance-replenishment"
      ).style.display = "block";
    } else if (needed == "#rules") {
      document.querySelector(".content-block.game-rules").style.display =
        "block";
    }
  });

  // styling friends list
  let friends_list = document.querySelector(".friends-list");

  let friends_array = Array.from(friends_list.children);

  for (let i = 0; i < friends_array.length; i++) {
    let friend = friends_array[i];
    friend.style.left = -20 * i + "px";
    friend.style.zIndex = i + 1;
  }

  function show_friends_list(friends) {
    let previous = document.querySelector(".content-block");
    previous.style.display = "none";
    let content_block = document.createElement("div");
    content_block.className = "content-block";
    content_block.innerHTML = "";

    // header
    let header = document.createElement("header");
    header.className = "friends-header";

    // header h1
    let h1 = document.createElement("h1");
    h1.innerHTML = "Профиль";
    let dot = document.createElement("span");
    dot.innerHTML =
      '<svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="3" cy="3" r="3" fill="#A49982"/></svg>';
    h1.append(dot);
    let friends_span = document.createElement("span");
    friends_span.innerHTML = "Друзья";
    h1.append(friends_span);
    header.append(h1);

    // header back button
    let back = document.createElement("div");
    back.className = "back";
    let p = document.createElement("p");
    p.innerHTML = "Вернуться назад";
    back.append(p);
    let button = document.createElement("button");
    button.append(document.createElement("img"));
    button.querySelector("img").src = "assets/back-button.png";
    button.addEventListener("click", () => {
      previous.style.display = "";
      content_block.style.display = "none";
    });
    back.append(button);
    header.append(back);
    content_block.append(header);

    // friends number
    let friends_number = document.createElement("div");
    friends_number.className = "friends-number";
    let friends_number_p = document.createElement("p");
    friends_number_p.innerHTML = "";
    let friends_number_text = document.createElement("span");
    friends_number_text.innerHTML = "Все друзья";
    friends_number_p.append(friends_number_text);
    let friends_number_span = document.createElement("span");
    friends_number_span.className = "friends-number-span";
    friends_number_span.innerHTML = friends.length;
    friends_number_p.append(friends_number_span);
    friends_number.append(friends_number_p);
    content_block.append(friends_number);

    // pushing friends
    let friends_table = document.createElement("div");
    friends_table.className = "friends-table";

    for (let friend of friends) {
      let div = document.createElement("div");
      div.className = "friend-item";

      let friend_profile_photo = document.createElement("div");
      friend_profile_photo.className = "friend-profile-photo";
      let img = document.createElement("img");
      img.src = friend.src;
      friend_profile_photo.append(img);
      div.append(friend_profile_photo);

      let friend_text = document.createElement("div");
      friend_text.className = "friend-text";
      let friend_name = document.createElement("p");
      friend_name.innerHTML = friend.name;
      friend_text.append(friend_name);
      let view_friend_profile = document.createElement("button");
      view_friend_profile.innerHTML = "Посмотреть профиль";
      friend_text.append(view_friend_profile);
      div.append(friend_text);

      let options_button = document.createElement("button");
      options_button.className = "options-button";
      let options_button_image = document.createElement("img");
      options_button_image.src = "assets/options-button.png";
      options_button.append(options_button_image);
      div.append(options_button);
      friends_table.append(div);
    }
    content_block.append(friends_table);
    document.querySelector("main.main-content").append(content_block);
  }

  friends_list.addEventListener("click", () => {
    show_friends_list([
      {
        name: "Eric123",
        src: "assets/all-friends-1.png",
      },
      {
        name: "Lily",
        src: "assets/all-friends-2.png",
      },
      {
        name: "Bo$$",
        src: "assets/all-friends-3.png",
      },
      {
        name: "Ludwig",
        src: "assets/all-friends-4.png",
      },
      {
        name: "Conor222",
        src: "assets/all-friends-5.png",
      },
      {
        name: "Oleggg",
        src: "assets/all-friends-6.png",
      },
      {
        name: "Bubble",
        src: "assets/all-friends-7.png",
      },
      {
        name: "WonderBoy",
        src: "assets/all-friends-8.png",
      },
    ]);
  });

  // input overlays

  for (let div of document.querySelectorAll("div.input-overlay")) {
    div.addEventListener("mousedown", () => {
      div.style.display = "none";
      setTimeout(() => {
        div.previousElementSibling.focus();
      }, 0);
    });
    div.previousElementSibling.addEventListener("blur", () => {
      div.style.display = "";
    });
  }

  document
    .querySelector(".app")
    .prepend(document.querySelector(".sidebar-nav"));
});

let menu_button = document.querySelector(".nav-adaptive button");
menu_button.addEventListener("click", () => {
  let status = menu_button.dataset.status;
  if (status == "off") {
    document.querySelector("nav.sidebar-nav").style.left = "-7px";
    document.querySelector(".darken").style.zIndex = 20;
    document.querySelector(".darken").style.opacity = "1";
    menu_button.dataset.status = "on";
    document.documentElement.style.overflow = "hidden";
    document.addEventListener("click", (e) => {
      if (e.target.matches(".darken")) {
        document.querySelector("nav.sidebar-nav").style.left =
          "calc(-100vw - 7px)";
        menu_button.dataset.status = "off";
        document.querySelector(".darken").style.zIndex = -1;
        document.querySelector(".darken").style.opacity = "0";
        document.documentElement.style.overflow = "";
      }
    });
    // setTimeout(() => {
    //   document.addEventListener("click", click_listener);
    // }, 0);
  } else {
    document.querySelector("nav.sidebar-nav").style.left = "calc(-100vw - 7px)";
    menu_button.dataset.status = "off";
    document.querySelector(".darken").style.zIndex = -1;
    document.querySelector(".darken").style.opacity = "0";
    document.documentElement.style.overflow = "";
    // document.removeEventListener("click", click_listener);
  }

  function click_listener(e) {
    if (
      !e.target.matches("nav.sidebar-nav") ||
      !e.target.matches(".menu-button")
    ) {
      menu_button.dispatchEvent(new Event("click"));
    }
  }
});

if (window.matchMedia("(max-width: 850px)").matches) {
  document.body.prepend(document.querySelector("nav.sidebar-nav"));
  document.querySelector("nav.sidebar-nav").addEventListener("click", (e) => {
    if (e.target.matches(".sidebar-nav > a")) {
      menu_button.dispatchEvent(new Event("click"));
    }
  });
}

window.addEventListener("load", () => {
  // navigation
  let nav = document.querySelector("nav.sidebar-nav");
  let current = String(document.URL).slice(String(document.URL).indexOf("#"));
  let link = nav.querySelector(`a[href="${current}"]`);
  if (!String(document.URL).includes("#")) {
    link = nav.querySelector(".profile-link");
  }
  // link.dispatchEvent(new Event("click"));
  link.click();
});
