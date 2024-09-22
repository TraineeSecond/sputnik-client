import {Colors} from './colors';

export type fontWeight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | undefined;

type FontFamily =
  | 'Unbounded-Bold'
  | 'Unbounded-Black'
  | 'Unbounded-ExtraBold'
  | 'Unbounded-ExtraLight'
  | 'Unbounded-Light'
  | 'Unbounded-Medium'
  | 'Unbounded-Regular'
  | 'Unbounded-SemiBold';

interface ITextStyle {
  p1: TextStyle;
  p2: TextStyle;
  p3: TextStyle;
  h1: TextStyle;
  h2: TextStyle;
  h3: TextStyle;
  button1: TextStyle;
  button2: TextStyle;
}

class TextStyle {
  constructor(
    fontSize: number,
    fontWeight: fontWeight,
    color: Colors,
    fontFamily: FontFamily,
    lineHeight?: number,
  ) {
    this.fontSize = fontSize;
    this.fontWeight = fontWeight;
    this.color = color;
    this.fontFamily = fontFamily;
    this.lineHeight = lineHeight;
  }

  fontSize: number;
  fontWeight: fontWeight;
  color: Colors;
  fontFamily: FontFamily;
  lineHeight?: number;

  changeColor(color: Colors) {
    return new TextStyle(
      this.fontSize,
      this.fontWeight,
      color,
      this.fontFamily,
      this.lineHeight,
    );
  }
}

export const TextStyles: ITextStyle = {
  p1: new TextStyle(16, '500', Colors.Gray100, 'Unbounded-Regular'),
  p2: new TextStyle(18, '600', Colors.Gray100, 'Unbounded-Regular', 26),
  p3: new TextStyle(20, '700', Colors.Gray100, 'Unbounded-Regular'),
  h1: new TextStyle(26, '700', Colors.Blue100, 'Unbounded-Regular'),
  h2: new TextStyle(24, '700', Colors.Blue100, 'Unbounded-Regular'),
  h3: new TextStyle(22, '700', Colors.Blue100, 'Unbounded-Regular'),
  button1: new TextStyle(16, '700', Colors.White100, 'Unbounded-SemiBold'),
  button2: new TextStyle(20, '700', Colors.Blue100, 'Unbounded-SemiBold'),
};
