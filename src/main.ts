import './styles/main.css';
import { GameApp } from './app/GameApp';

const canvas = document.querySelector<HTMLCanvasElement>('#game-canvas');
const uiRoot = document.querySelector<HTMLElement>('#ui-root');

if (!canvas || !uiRoot) {
  throw new Error('Canvas oder UI-Container wurden im DOM nicht gefunden.');
}

const app = new GameApp(canvas, uiRoot);
app.start();
