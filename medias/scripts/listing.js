const allEvents = document.querySelector(".all_events");
const myEvents = document.querySelector(".my_events");
const createEvent = document.querySelector(".create_event");

const buttonCreate = document.querySelector(".button_create_event");
const buttonCancel = document.querySelector(".cancel_create_event");

const modalCreateEvent = document.querySelector(".modal_create_event");

async function createListing() {
  const title = document.querySelector(".event_title").value;
  const dateEvent = document.querySelector(".event_date").value;
  const maxParticipants = document.querySelector(
    ".event_maxParticipants"
  ).value;
  const description = document.querySelector(".event_description").value;
  const image = document.querySelector(".event_image").value;

  const listing = {
    title: title,
    description: description,
    date_event: dateEvent,
    max_participants: maxParticipants,
    image: image,
  };
  console.log(listing);
  const token = window.localStorage.getItem("token");

  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(listing),
  };

  const apiRequest = fetch("http://localhost:3232/event/add", request);
  const response = await apiRequest;
  console.log(response);
  if (response.status === 200) {
    modalCreateEvent.classList.add("hidden");
    getMyevent();
  }
}

async function editListing(listingId) {
  const title = document.querySelector(".event_title").value;
  const dateEvent = document.querySelector(".event_date").value;
  const maxParticipants = document.querySelector(
    ".event_maxParticipants"
  ).value;
  const description = document.querySelector(".event_description").value;
  const image = document.querySelector(".event_image").value;

  const listing = {
    title: title,
    description: description,
    date_event: dateEvent,
    max_participants: maxParticipants,
    image: image,
  };
  console.log(listing);
  const token = window.localStorage.getItem("token");

  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(listing),
  };

  const apiRequest = fetch(
    `http://localhost:3232/event/edit/${listingId}`,
    request
  );
  const response = await apiRequest;
  console.log(response);

  modalCreateEvent.classList.add("hidden");
}

async function getMyevent() {
  const allCards = document.querySelector("main");
  allCards.innerHTML = "";

  const token = window.localStorage.getItem("token");

  const request = {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      authorization: `Bearer ${token}`,
    },
  };

  const getMyEvents = await fetch(
    "http://localhost:3232/event/get-from-user",
    request
  );

  const getAllResponse = await getMyEvents.json();

  console.log(getMyEvents);
  console.log({ getAllResponse: getAllResponse });

  getAllResponse.forEach((element) => {
    allCards.innerHTML += `  <div
        class="max-w-sm m-5 bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500"
      >
        <h3 class="mb-3 text-xl font-bold text-indigo-600">${element.title}</h3>
        <div class="relative">
          <img
            class="w-full rounded-xl"
            src=${element.image}
            alt="Colors"
          />
        </div>
        <p class="mt-4 text-gray-800 cursor-pointer">${element.description}</p>
        <div class="my-4">
          <div class="flex space-x-1 items-center">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-indigo-600 mb-1.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
            <p>${element.date_event}</p>
          </div>
          <div class="flex space-x-1 items-center">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-indigo-600 mb-1.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </span>
            <p>${element.list_participants.length}/${
      element.max_participants
    }</p>
          </div>
          <button
            class="mt-4 text-xl w-5/12 text-white bg-indigo-600 py-2 rounded-xl shadow-lg"
          >
            ${"Voir plus"}
          </button>
          <button
            class="mt-4 text-xl w-5/12 text-white bg-orange-600 py-2 rounded-xl shadow-lg"
            onclick = "editListing('${element._id}')"
            onclick = "modalCreateEvent.classList.remove("hidden")"
          >
            ${"Edit"}
          </button>
        </div>
      </div>`;
  });
}

async function getAllEvent() {
  const allCards = document.querySelector("main");
  allCards.innerHTML = "";

  const getAllEvents = await fetch("http://localhost:3232/event/get-all");
  const getAllResponse = await getAllEvents.json();
  getAllResponse.forEach((element) => {
    allCards.innerHTML += `  <div
        class="max-w-sm m-5 bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500"
      >
        <h3 class="mb-3 text-xl font-bold text-indigo-600">${element.title}</h3>
        <div class="relative">
          <img
            class="w-full rounded-xl"
            src="${element.image}"
            alt="Colors"
          />
        </div>
        <p class="mt-4 text-gray-800 cursor-pointer">${element.description}</p>
        <div class="my-4">
          <div class="flex space-x-1 items-center">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-indigo-600 mb-1.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
            <p>${element.date_event}</p>
          </div>
          <div class="flex space-x-1 items-center">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-indigo-600 mb-1.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </span>
            <p>${element.list_participants.length}/${element.max_participants}</p>
          </div>

        </div>
      </div>`;
  });
  console.log(getAllResponse);
}
getAllEvent();
allEvents.addEventListener("click", getAllEvent);
myEvents.addEventListener("click", getMyevent);
createEvent.addEventListener("click", () => {
  modalCreateEvent.classList.remove("hidden");
});
buttonCreate.addEventListener("click", (e) => {
  createListing();
});
