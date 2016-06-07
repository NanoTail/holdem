package holdem;

import java.util.*;
import java.io.Console;

/**
 *
 * @author nilotpal
 */
public class Holdem {

    public Holdem() {
        
    }
    
    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) throws Exception {
        
        int players = 0;
        
        Console console = System.console();
        
        if(console == null) {
            System.out.println("Cannot attach console");
            return;
        }
        
        console.printf("Poker hand analyzer");
        
        while(true) {
            console.printf("\nType 0 to Exit");
            console.printf("\nPress any key to continue...\n");
        
            String choice = console.readLine();
            if(choice.equals("0")) {
                break;
            }
            
            Deck deck = new Deck();
            deck.dealCommunityCards();
            
            while (true) {
                console.printf("\nNumber of players? (%d): ", players);
                try {
                    String p = console.readLine();
                    if (p.equals("") && players > 0) {
                        break;
                    }
                    players = Integer.parseInt(p);
                    break;
                } catch (NumberFormatException ex) {
                    console.printf("\nInvalid number. Try again.\n");
                }
            }
            
            console.printf("\nCommunity cards: %s", Arrays.toString(deck.communityCards));
            
            ArrayList<Hand> hands = new ArrayList();
            
            for(int i = 0; i < players; i++) {
                try {
                    hands.add(new Hand(deck.communityCards, deck.dealHoldCards()));
                } catch (Exception ex) {
                    console.printf("\n\nDealt %d hands, %s\n", i+1, ex.getMessage());
                    break;
                }
            }
            
            Collections.sort(hands);
            console.printf("\nHands in desc order of rank");
            console.printf("\n");
            if (args.length > 0 && args[0].equals("-v")) {
                console.printf("\n%20s | %20s | %20s | %10s", "Rank", "Hand", "Reduced", "Rank Bit");
                console.printf("\n---------------------------------------------------------------------------------");
            } else {
                console.printf("\n%20s | %20s", "Rank", "Hand");
                console.printf("\n----------------------------------------------");
            }
            for(int i = 0; i < hands.size(); i++) {
                if (args.length > 0 && args[0].equals("-v")) {
                    console.printf("\n%20s | %20s | %20s | %10s", 
                            hands.get(i).rankName(),
                            Arrays.toString(hands.get(i).cards),
                            Arrays.toString(hands.get(i).values()),
                            hands.get(i).rankBit()
                            );
                } else {
                    console.printf("\n%20s | %20s", hands.get(i).rankName(), Arrays.toString(hands.get(i).cards));
                }
            }
            console.printf("\n\n");
        }
    }    
}
