import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
*::before, *::after, h1, h2, h3, h4, h5, h6{
 margin: 0;
 padding: 0;
}
h1,h2, h3, h4, h5, h6{
 display: inline-block;
}

*::-webkit-scrollbar {
  width: 0px;
}
 *{
  box-sizing:border-box;
 }

 * a{
  text-decoration:none;
 }

button { user-select: none; cursor:pointer;}

body{
 margin: 0;
 padding: 0;
 height: 100vh;
 width: 100vw;
 box-sizing:border-box;
 overflow-x: hidden;
 font-family: 'Source Sans Pro', sans-serif;
 -webkit-tap-highlight-color: rgba(0,0,0,0);

  .react-calendar-heatmap .color-scale-1 { fill: #d6e685; }
  .react-calendar-heatmap .color-scale-2 { fill: #8cc665; }
  .react-calendar-heatmap .color-scale-3 { fill: #44a340; }
  .react-calendar-heatmap .color-scale-4 { fill: #1e6823; }

}`;

export default GlobalStyle;
