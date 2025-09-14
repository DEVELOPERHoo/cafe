"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Client, IFrame, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export const useStompClient = () => {
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const clientRef = useRef<Client | null>(null); // 컴포넌트의 수명동안 유지(리렌더링시 초기화 방지)

  const connectStomp = (cartId: string) => {
    if (clientRef.current) return; // 이미 연결된 경우 방지
    const client = new Client({
      brokerURL: `wss://${process.env.NEXT_PUBLIC_SOCKET_API_SERVER_URL}`,
      /*
      webSocketFactory: () =>
        new SockJS(`${process.env.NEXT_PUBLIC_CAFE_API_SERVER_URL}/wss`),*/
      reconnectDelay: 5000, //  연결 끊기면 5초 후 자동 재연결
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: (frame: IFrame) => {
        setIsConnected(true);
        console.log("STOMP 클라이언트 연결 성공:", frame);
        const destination = `/sub/${cartId}`;
        client.subscribe(destination, (msg) => {
          const data = JSON.parse(msg.body);
          console.log(`📩 [${destination}] 메시지 수신:`, data);
        });
        console.log("📡 구독 시작:", destination);
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

    client.activate(); // 서버와 연결시도
    clientRef.current = client;
    setStompClient(client);
  };
  /*
  const subscribe = useCallback(
    (destination: string, callback: (msg: IMessage) => void) => {
      if (stompClient && isConnected) {
        const subscription = stompClient.subscribe(destination, callback);
        console.log(`Subscribed to ${destination}`);
        return subscription;
      } else {
        console.warn("STOMP is not connected yet!");
      }
    },
    [stompClient, isConnected]
  );*/

  const publish = useCallback(
    (destination: string, body: any) => {
      if (stompClient && isConnected) {
        stompClient.publish({
          destination,
          body: JSON.stringify(body),
        });
        console.log(`Published to ${destination}`, body);
      } else {
        console.warn("STOMP is not connected yet");
      }
    },
    [stompClient, isConnected]
  );

  const disconnectStomp = () => {
    if (clientRef.current && clientRef.current.active) {
      clientRef.current.deactivate();
      clientRef.current = null;
      setIsConnected(false);
    }
  };

  return { stompClient, isConnected, connectStomp, publish };
};
