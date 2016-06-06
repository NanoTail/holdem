package holdem;

import java.util.*;

/**
 *
 * @author nilotpal
 */
public class Rank {
    private HashMap<Integer, String> handRanks = new HashMap();
    
    public Rank() {
        buildhandRanks();
    }
    
    private void buildhandRanks() {
        handRanks.put(10, "Royal Flush");
        handRanks.put(9, "Straight Flush");
        handRanks.put(8, "Four of a Kind");
        handRanks.put(7, "Full House");
        handRanks.put(6, "Flush");
        handRanks.put(5, "Straight");
        handRanks.put(4, "Three of a Kind");
        handRanks.put(3, "Two Pair");
        handRanks.put(2, "One Pair");
        handRanks.put(1, "High Card");
    }
    
    public Hand analyze(Hand hand) {
        this.setRank(hand, 1);
        if(this.isRoyalFlush(hand)) {
            this.setRank(hand, 10);
        } else if(this.isStraightFlush(hand)) {
            this.setRank(hand, 9);
        } else if(this.isFourOfaKind(hand)) {
            this.setRank(hand, 8);
        } else if(this.isFullHouse(hand)) {
            this.setRank(hand, 7);
        } else if(this.isFlush(hand)) {
            this.setRank(hand, 6);
        } else if(this.isStraight(hand)) {
            this.setRank(hand, 5);
        } else if(this.isThreeOfaKind(hand)) {
            this.setRank(hand, 4);
        } else if(this.isTwoPair(hand)) {
            this.setRank(hand, 3);
        } else if(this.isOnePair(hand)) {
            this.setRank(hand, 2);
        }
        return hand;
    }
    
    private void setRank (Hand hand, int rank) {
        hand.setRank(handRanks.get(rank), rank);
    }
    
    private boolean isFlush(Hand hand) {
        return (
                hand.suits().equals("CCCCC") || 
                hand.suits().equals("DDDDD") || 
                hand.suits().equals("HHHHH") ||
                hand.suits().equals("SSSSS")
        );
    }
    
    private boolean isRoyalFlush(Hand hand) {
        //System.out.println(Arrays.toString(hand.values()));
        if(this.isFlush(hand)) {
            return (
                    hand.values()[0] == 14 &&
                    hand.values()[1] == 13 &&
                    hand.values()[2] == 12 &&
                    hand.values()[3] == 11 &&
                    hand.values()[4] == 10
            );
        }
        
        return false;
    }
    
    private boolean isStraightFlush(Hand hand) {
        return (this.isFlush(hand) && this.isStraight(hand));
    }
    
    private boolean isStraight(Hand hand) {
        Integer[] values = hand.values();
        boolean straight = true;
        int i;
        
        for(i = 0; i < values.length - 1; i++) {
            if(values[i] != values[i+1] + 1) {
                straight = false;
            }
        }
        
        return straight;
    }
    
    private boolean isOnePair(Hand hand) {
        int pairCount = 0;
        for(Integer value : hand.hash().values()) {
            if(value == 2) {
                pairCount++;
            }
        }
        return pairCount == 1;
    }
    
    private boolean isTwoPair(Hand hand) {
        int pairCount = 0;
        for(Integer value : hand.hash().values()) {
            if(value == 2) {
                pairCount++;
            }
        }
        return pairCount == 2;
    }
    
    private boolean isThreeOfaKind(Hand hand) {
        int threes = 0;
        for(Integer value : hand.hash().values()) {
            if(value == 3) {
                threes++;
            }
        }
        
        return threes == 1;
    }
    
    private boolean isFourOfaKind(Hand hand) {
        int fours = 0;
        for(Integer value : hand.hash().values()) {
            if(value == 4) {
                fours++;
            }
        }
        return fours == 1;
    }
    
    private boolean isFullHouse(Hand hand) {
        return (this.isThreeOfaKind(hand) && this.isOnePair(hand));
    }
}
