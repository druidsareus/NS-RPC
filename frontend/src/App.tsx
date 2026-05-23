import { Component, For, createSignal, createEffect, Show } from "solid-js";
import {
  GetGamesList,
  SetGame,
  CheckConn,
  Reconnect,
  PinGame,
  GetPins,
  IsMac,
  AddCustomGames,
  RemoveGame,
} from "../wailsjs/go/main/App";
import { faToggleOn, faThumbTack, faTrash } from "@fortawesome/free-solid-svg-icons";
import Fa, { FaLayers } from "solid-fa";

const App: Component = () => {
  const [gamesList, setGamesList] = createSignal([
    { title: "Home", img: "home" },
  ]);
  const [pinsShow, setPinsShow] = createSignal(false);
  const [customShow, setCustomShow] = createSignal(false);
  const [removeShow, setRemoveShow] = createSignal(false);
  const [selection, setSelection] = createSignal("Home");
  const [status, setStatus] = createSignal("Online");
  const [connErr, setConnErr] = createSignal(false);
  const [isMac, setIsMac] = createSignal(false);
  const [customInput, setCustomInput] = createSignal("");
  const [customMsg, setCustomMsg] = createSignal("");

  IsMac().then((result: boolean) => setIsMac(result));

  const connCheck = () => {
    CheckConn().then((result: boolean) => {
      if (result) setConnErr(true);
    });
  };

  const handleAddCustomGames = () => {
    const input = customInput();
    if (input.trim() === "") {
      setCustomMsg("Please enter game titles");
      return;
    }
    AddCustomGames(input).then((result: string) => {
      const parsed = JSON.parse(result);
      setCustomMsg(`Added ${parsed.added} new games!`);
      setCustomInput("");
      setTimeout(() => setCustomMsg(""), 3000);
      GetGamesList().then((result: string) =>
        setGamesList(JSON.parse(result))
      );
    });
  };

  const handleRemoveGame = (title: string) => {
    RemoveGame(title).then((result: string) => {
      const parsed = JSON.parse(result);
      if (parsed.removed) {
        setCustomMsg("Game removed!");
        setTimeout(() => setCustomMsg(""), 2000);
        GetGamesList().then((result: string) =>
          setGamesList(JSON.parse(result))
        );
        if (selection() === title) {
          setSelection("Home");
        }
      }
    });
  };

  createEffect(() => {
    selection();
    status();
    connCheck();
  });

  return (
    <div class="text-white text-center select-none">
      <div class={`bg-red-600 ${isMac() ? "pt-16" : "pt-6"} pb-6`}>
        <p class=" text-2xl font-semibold">[NS-RPC]</p>
        <FaLayers size="2x">
          <Fa icon={faToggleOn} />
        </FaLayers>
      </div>
      <Show when={!customShow() && !removeShow()}>
        <div class="container pt-5 pb-5">
          <label for="games" class="block mb-2 font-medium">
            {!pinsShow() ? "Game" : "Pins"}
          </label>
          <select
            id="games"
            class="bg-slate-800 border border-white rounded-lg focus:border-red-600 w-80 h-10"
            onChange={(e) => setSelection(e.currentTarget.value)}
            onMouseOver={() => {
              if (gamesList().length <= 2 && !pinsShow()) {
                GetGamesList().then((result: string) =>
                  setGamesList(gamesList().concat(JSON.parse(result)))
                );
              }
            }}
          >
            <For each={gamesList()}>
              {(game: { title: string; img: string }) => (
                <option value={game.title}>{game.title}</option>
              )}
            </For>
          </select>
          <label for="status" class="block pt-5 mb-2 font-medium">
            Status
          </label>
          <input
            id="status"
            class="bg-slate-800 border border-white rounded-lg focus:border-red-600 w-80 h-10 pl-2 pr-2"
            onChange={(e) => setStatus(e.currentTarget.value)}
            placeholder="Online, Karting with Friends, etc..."
          />
        </div>
        <div class="flex justify-center gap-2 mb-4">
          <button
            class="rounded-xl bg-red-700 w-20 h-10"
            onClick={() => SetGame(selection(), status())}
          >
            Play
          </button>
          <button
            class="rounded-xl bg-yellow-400 text-black w-20 h-10"
            onClick={() => SetGame("Home", "Idle")}
          >
            Idle
          </button>
        </div>
        <div class="flex justify-center gap-2 mb-4">
          <button
            class="rounded-xl bg-indigo-700 w-10 h-10"
            onClick={() => PinGame(selection())}
          >
            <FaLayers>
              <Fa icon={faThumbTack} />
            </FaLayers>
          </button>
          <button
            class="rounded-xl bg-indigo-700 w-24 h-10"
            onClick={() => {
              if (!pinsShow())
                GetPins().then((result: string) => {
                  setGamesList(JSON.parse(result));
                });
              else
                GetGamesList().then((result: string) =>
                  setGamesList(JSON.parse(result))
                );
              setPinsShow(!pinsShow());
            }}
          >
            Switch {!pinsShow() ? "Pins" : "List"}
          </button>
          <button
            class="rounded-xl bg-blue-700 w-32 h-10"
            onClick={() => setCustomShow(true)}
          >
            Add Custom Games
          </button>
          <button
            class="rounded-xl bg-red-900 w-28 h-10"
            onClick={() => setRemoveShow(true)}
          >
            Remove Game
          </button>
        </div>
      </Show>

      <Show when={customShow()}>
        <div class="container pt-5 pb-5">
          <label for="customGames" class="block mb-2 font-medium">
            Paste Game Titles (one per line)
          </label>
          <textarea
            id="customGames"
            class="bg-slate-800 border border-white rounded-lg focus:border-red-600 w-80 h-32 pl-2 pr-2 pt-2"
            placeholder="Game 1&#10;Game 2&#10;Game 3..."
            value={customInput()}
            onInput={(e) => setCustomInput(e.currentTarget.value)}
          />
          <div class="mt-4 flex justify-center gap-2">
            <button
              class="rounded-xl bg-green-700 w-20 h-10"
              onClick={handleAddCustomGames}
            >
              Add
            </button>
            <button
              class="rounded-xl bg-gray-700 w-20 h-10"
              onClick={() => {
                setCustomShow(false);
                setCustomInput("");
                setCustomMsg("");
              }}
            >
              Back
            </button>
          </div>
          <Show when={customMsg() !== ""}>
            <p class="mt-4 text-green-400">{customMsg()}</p>
          </Show>
        </div>
      </Show>

      <Show when={removeShow()}>
        <div class="container pt-5 pb-5">
          <label for="removeGames" class="block mb-2 font-medium">
            Select Game to Remove
          </label>
          <select
            id="removeGames"
            class="bg-slate-800 border border-white rounded-lg focus:border-red-600 w-80 h-10"
            value={selection()}
            onChange={(e) => setSelection(e.currentTarget.value)}
          >
            <For each={gamesList()}>
              {(game: { title: string; img: string }) => (
                <option value={game.title}>{game.title}</option>
              )}
            </For>
          </select>
          <div class="mt-4 flex justify-center gap-2">
            <button
              class="rounded-xl bg-red-700 w-20 h-10"
              onClick={() => handleRemoveGame(selection())}
            >
              <FaLayers>
                <Fa icon={faTrash} />
              </FaLayers>
            </button>
            <button
              class="rounded-xl bg-gray-700 w-20 h-10"
              onClick={() => {
                setRemoveShow(false);
                setCustomMsg("");
              }}
            >
              Back
            </button>
          </div>
          <Show when={customMsg() !== ""}>
            <p class="mt-4 text-green-400">{customMsg()}</p>
          </Show>
        </div>
      </Show>

      <Show when={connErr()}>
        <p
          onClick={() =>
            Reconnect().then((result: boolean) => {
              if (result) setConnErr(false);
            })
          }
          class="mt-5 font-mono underline bg-red-600"
        >
          Couldn't hook the Discord client.
          <br />
          Ensure Discord is started, then click this message to retry.
        </p>
      </Show>
    </div>
  );
};

export default App;
