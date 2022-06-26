import express, { Request, Response, NextFunction } from "express";

import * as appPackage from "../package.json";
const MAXURL = 2083;
export const checkTrailingSlash = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const trailingSlashUrl = req.baseUrl + req.url;
  
    if (req.originalUrl !== trailingSlashUrl) {
      res.redirect(301, trailingSlashUrl);
    } else {
      next();
    }
  };

export function setHeaderWithAppVersion(req: Request, res: Response, next: NextFunction){

    res.setHeader('appver', appPackage.version || 'null' )
    next();
  }
  export function checkUrlTooLong(url: string) {
    //DO return 414-URI Too Long if a URL exceeds 2083 characters
  
    return url.length > MAXURL ? true : false;
  }
  export function preRouteWork(req: Request, res: Response, next: NextFunction){
  
    if (checkUrlTooLong(req.url)) {
      return res.status(414).json({ error: "URL too long" });
    }
  
    next();
  
  };