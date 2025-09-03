"use client";
import { useState, useEffect, useRef } from "react";
import { Client, IFrame } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export const useStompClient = () => {
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const clientRef = useRef<Client | null>(null); //컴포넌트의 수명동안 유지(리렌더링시 초기화 방지)
  useEffect(() => {
    if (clientRef.current) {
      return;
    }
    const client = new Client({
      brokerURL: `ws//${process.env.CAFE_API_SERVER_URL}/cart`,
      webSocketFactory: () =>
        new SockJS(`${process.env.CAFE_API_SERVER_URL}/ws`) as WebSocket,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: (frame: IFrame) => {
        setIsConnected(true);
        console.log("STOMP 클라이언트 연결 성공:", frame);
      },
      onDisconnect: (frame: IFrame) => {
        setIsConnected(false);
        console.log("STOMP 클라이언트 연결 해제:", frame);
      },
      onStompError: (frame: IFrame) => {
        console.error(
          "STOMP Broker reported an error:",
          frame.headers["message"]
        );
        console.log("Additional details:", frame.body);
      },
      onWebSocketError: (event: Event) => {
        console.error("WebSocket Error:", event);
      },
    });

    client.activate();
    clientRef.current = client;
    setStompClient(client);

    return () => {
      if (clientRef.current && clientRef.current.active) {
        clientRef.current.deactivate();
        clientRef.current = null;
      }
    };
  }, []);
  return { stompClient, isConnected };
};
