import { ElementType, ReactNode } from "react";
import { Theme } from "@mui/system";
import { TypographyProps, SxProps, SvgIconProps } from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";
import { AppConstant, NFTConstant } from "const";

export interface IProps {
  children?: ReactNode;
  className?: string;
  classes?: object;
}

export interface IIconProps extends SvgIconProps {
  sx?: object;
  className?: string;
}

interface TypographyItemProps {
  fontSize: StringOrNumber;
  fontWeight: StringOrNumber;
  lineHeight: string;
}

export interface ThemeProps extends Theme {
  typography: {
    h1: TypographyItemProps;
    h2: TypographyItemProps;
    h3: TypographyItemProps;
    h4: TypographyItemProps;
    h5: TypographyItemProps;
    h6: TypographyItemProps;
    body1: TypographyItemProps;
    body2: TypographyItemProps;
    subtitle1: TypographyItemProps;
    subtitle2: TypographyItemProps;
    caption: TypographyItemProps;
    overline: TypographyItemProps;
    fontSize: number;
    htmlFontSize: number;
    fontWeightLight: number;
    fontWeightRegular: number;
    fontWeightMedium: number;
    fontWeightBold: number;
  };
  zIndex: {
    appBar: 1100;
  };
}

export interface AppTypographyProps extends TypographyProps {
  variant?: Variant;
  children?: ReactNode;
  responsiveVariant?: {
    xs?: Variant;
    sm?: Variant;
    md?: Variant;
    lg?: Variant;
    xl?: Variant;
  };
  sx?: SxProps;
  component?: ElementType;
  className?: string;
}

export interface EventInputFileProps {
  target: HTMLInputElement & EventTarget;
}

export interface KeyAbleProps {
  [key: string]: unknown;
}

export interface ObjectMultiLanguageProps {
  [x: string]: string;
}

export type StringOrNumber = string | number;
export type NumberOrNull = number | null | undefined;
export type StringOrNull = string | null | undefined;
export type Nullable<T> = T | null | undefined;
export type JsonClass<T> = KeyAbleProps | T;
export type KeyOf<T> = keyof T;
export type ValueOf<T> = T[KeyOf<T>];

export type SagaAction<T> = {
  type: string;
  data: T;
};

export type ResponseData<T> = {
  statusCode: number;
  data: T;
};
export type ResponseDataList<T> = {
  statusCode: number;
  data: {
    pageData: T[];
    pageNum: number;
    total: number;
  };
};

export type SagaActionWithParams<T, A> = {
  type: string;
  data: T;
  params: A;
};

export interface IReceiptTransaction {
  [x: string]: string;
  status: AppConstant.TRANSACTION_STATUS_TYPE;
  message: string;
}

export type ResponseApproveTransaction = {
  status: number;
  data: string;
};

export type TypeNftComponent = {
  typeItemClass: string;
  pathname: string;
  NftComponent: ElementType;
};

export type TypeNftQuery = {
  itemClass: NFTConstant.NFT_CLASS_TYPE;
  pageNum?: number;
  pageSize?: number;
  itemTypes?: Array<NFTConstant.NFT_TYPE>;
  rareTypes?: Array<NFTConstant.RARITY_TYPE>;
  startPrice?: number;
  toPrice?: number;
  level?: number;
  sorts?: {
    [x: string]: string;
  };
};
