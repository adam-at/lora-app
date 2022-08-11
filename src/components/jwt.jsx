import React from 'react';

export const jwt = localStorage.getItem("jwt");
export const key = "Bearer " + jwt;