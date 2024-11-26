import React, { useEffect, useState, useCallback } from 'react';
import { ethers, JsonRpcProvider } from 'ethers';
import { Button } from '@mui/material';
import abi from "./nft_abi.json";
import address from "./address.json";
import Toast from './ui/toast';


const contractAddress = address.NFTAddress;
const rpcUrl = "https://rpc5.gemini.axiomesh.io/";
const eventName = "Transfer";

interface EventListenerProps {
  }

// Helper function to safely stringify BigInt values
const safeStringify = (obj: any): string => {
  return JSON.stringify(obj, (_, value) =>
    typeof value === 'bigint' ? value.toString() : value
  )
}

export default function EventListener({}: EventListenerProps) {
    const [events, setEvents] = useState<string[]>([])
    const [isPolling, setIsPolling] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [lastBlockChecked, setLastBlockChecked] = useState<number | null>(null)
    const [latestEvent, setLatestEvent] = useState<string | null>(null)
  
    const pollForEvents = useCallback(async () => {
      if (!isPolling) return
  
      try {
        const provider = new JsonRpcProvider(rpcUrl)
        const contract = new ethers.Contract(contractAddress, abi, provider)
  
        const filter = contract.filters[eventName]()
        const latestBlock = await provider.getBlockNumber()
        const fromBlock = lastBlockChecked ? lastBlockChecked +1 : latestBlock - 100 // Start from 100 blocks ago if no last block
  
        const logs = await contract.queryFilter(filter, fromBlock, latestBlock)
        // let tokenIds: string[] = []
  
        if (logs.length > 0) {
          const newEvents = logs.map(log => {
            const event = contract.interface.parseLog(log)
            return `${eventName} at block ${log.blockNumber}: ${safeStringify(event.args)}`
          })
          setEvents(prevEvents => {
            const updatedEvents = [...prevEvents, ...newEvents];
            console.log(updatedEvents.length,prevEvents.length );
            if (updatedEvents.length > prevEvents.length) {
              setLatestEvent(newEvents[newEvents.length - 1]);
              // tokenIds.push(newEvents[newEvents.length - 1])
            } else{
              setLatestEvent(prevEvents[prevEvents.length - 1]);
            }
            return updatedEvents;
          })
        }else{
          setEvents([`Transfer at block 3990866: ["0x0000000000000000000000000000000000000000","0xC53132eF503aDE3a1cD163a975b4E83d79F94145","11"]`]);
        }
 
        setLastBlockChecked(latestBlock)
        setError(null)
      } catch (err) {
        console.error('Polling Error:', err)
        setError(`Polling Error: ${(err as Error).message}`)
      }
    }, [isPolling, contractAddress, abi, eventName, rpcUrl, lastBlockChecked])
  
    useEffect(() => {
      let intervalId: NodeJS.Timeout
  
      if (isPolling) {
        pollForEvents() // Initial poll
        intervalId = setInterval(pollForEvents, 2000) // Poll every 2 seconds
      }
  
      return () => {
        if (intervalId) clearInterval(intervalId)
      }
    }, [isPolling, pollForEvents])
  
    const togglePolling = () => {
      setIsPolling(prev => !prev)
    }
  
    return (
      <div className="w-full max-w-2xl">
        <div>
          <div>{eventName} Events</div>
        </div>
        <div>
          <div className="mb-4 flex items-center justify-between">
            <Button onClick={togglePolling} variant={isPolling ? "outlined" : "outlined"}>
              {isPolling ? "Stop Polling" : "Start Polling"}
            </Button>
            <span className="text-sm text-muted-foreground">
              {lastBlockChecked ? `Last checked block: ${lastBlockChecked}` : 'Not started'}
            </span>
          </div>
          {error && (
            <div className="mb-4 p-3 bg-destructive/15 text-destructive rounded-md" role="alert">
              {error}
            </div>
          )}
          <div className="space-y-2 max-h-96 overflow-auto">
            {events.length === 0 ? (
              <p className="text-center text-muted-foreground">No events found yet.</p>
            ) : (
              events.map((event, index) => (
                <div key={index} className="p-3 bg-muted rounded-md text-sm">
                  {event}
                </div>
              ))
            )}
          </div>
        </div>
        {/* {newEvents.map((event, index) => (
        <Toast key={`${lastBlockChecked}-${index}`} message={event} />
      ))} */}
        {latestEvent && <Toast message={latestEvent} />}
    </div>
    )
  }
  
  