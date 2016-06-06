package holdem;

import java.util.*;

public class Deck {
    
    public String[] communityCards = null;
    
    private String[] deckArray = new String[]{
        "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "HT", "HJ", "HQ", "HK", "HA",
        "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "DT", "DJ", "DQ", "DK", "DA",
        "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S9", "ST", "SJ", "SQ", "SK", "SA",
        "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "CT", "CJ", "CQ", "CK", "CA",
    };
    
    private int deckIndex = 0;
    private ArrayList<String> deck = null;
    
    public Deck() {
        deck = new ArrayList(Arrays.asList(deckArray));
        shuffle();
    }
    
    private void shuffle() {
        Collections.shuffle(deck);
    }
    
    public String[] dealCommunityCards() {
        String[] dealtCards = new String[3];
        deck.subList(0, 3).toArray(dealtCards);
        deckIndex += 3;
        communityCards = dealtCards;
        return dealtCards;
    }
    
    public String[] dealHoldCards() {
        String[] dealtCards = new String[2];
        deck.subList(deckIndex, deckIndex + 2).toArray(dealtCards);
        deckIndex += 2;
        return dealtCards;
    }
}
