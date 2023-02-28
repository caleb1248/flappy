import bg from './flap_back.png';
import pipeTop from './pipe_top.png';
import pipeBottom from './pipe_bottom.png';
import player from './bird.png';
import { Texture } from 'pixi.js';

const Textures = {
  bg: Texture.from(bg),
  pipeTop: Texture.from(pipeBottom),
  pipeBottom: Texture.from(pipeTop),
  player: Texture.from(player),
};

export default Textures;
