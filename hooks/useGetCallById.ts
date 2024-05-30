import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useState, useEffect } from "react";

export const useGetCallById = (id: string | string[]) => {
  const [call, setcall] = useState<Call>();
  const [isCallLoading, setisCallLoading] = useState(true);

  const client = useStreamVideoClient();

  useEffect(() => {
    if (!client) return;

    const loadCall = async () => {
      try {
        const { calls } = await client.queryCalls({
          filter_conditions: {
            id
          },
        });

        if (calls.length > 0) setcall(calls[0]);

        setisCallLoading(false);
      } catch (err) {
        console.error(err);
        setisCallLoading(false);
      }
    };
    loadCall();
  }, [client, id]);

  return { call, isCallLoading };
};
