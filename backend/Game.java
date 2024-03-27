import java.io.File;
import java.sql.*;
import java.util.Map;

public class Game {
    private static String DBUrl = "C:/Werewolf/db/";

    /**
     * Server
     * Runs database creation script if database is not present. Should be called prior to all other methods.
     * Visible only to server.
     * @return A new connection to database.
     * @throws SQLException if connection to database could not be formed.
     */
    public static Connection initializeDBConnection() throws SQLException{
        String jdbcUrl = "jdbc:sqlite:" + DBUrl;

        if (!(new File(DBUrl).isFile())) {
            Connection createDBConn = DriverManager.getConnection(jdbcUrl);
            Statement statement = createDBConn.createStatement();
            String schema = "CREATE TABLE game(\n" +
                    "    game_code CHAR(5) PRIMARY KEY,\n" +
                    "    datetime_created DATETIME NOT NULL,\n" +
                    "    started CHAR(1) DEFAULT 'n' NOT NULL,\n" +
                    "    num_players SMALLINT DEFAULT 0 NOT NULL,\n" +
                    "    CHECK (started in ('n', 'y'))\n" +
                    ");\n" +
                    "\n" +
                    "CREATE TABLE player(\n" +
                    "    game_code CHAR(5),\n" +
                    "    player_name VARCHAR(25),\n" +
                    "    role VARCHAR(10),\n" +
                    "    PRIMARY KEY (game_code, player_name)\n" +
                    ");";
            statement.execute(schema);
            statement.close();
        }

        return DriverManager.getConnection(jdbcUrl);
    }


    /**
     * Host
     * Creates new game, inserts game code into database, and returns game code.
     * @param gameCode The code of the game to be added.
     * @return game code, as a string of 5 digits.
     */
    public static String createNewGame(String gameCode) {

        try {
            Connection conn = initializeDBConnection();
            Timestamp creationTime = new Timestamp(System.currentTimeMillis());
            String insertGameCode = "INSERT INTO game (game_code, datetime_created) \n" +
                                    "VALUES (?, ?)";
            PreparedStatement statement = conn.prepareStatement(insertGameCode);
            statement.setString(1, gameCode);
            statement.setString(2, creationTime.toString());
            statement.executeUpdate();
            statement.close();
        } catch (SQLException e) {
            return("Failed to create new game:" + e.getMessage());
        }

        return gameCode;
    }

    /**
     * Host
     * Starts game pointed at by game code, assigns roles to players, and updates database accordingly.
     * @param gameCode The code of the game to be started.
     * @return A (String:String) map that connects player names to their roles.
     */
    public static Map<String, String> startGame(String gameCode){
        return null;
    }

    /**
     * Player
     * A request to join a given game.
     * @param gameCode The code of the game to be joined.
     * @param playerName The name of the player joining.
     * @return A string that contains possible failures
     */
    public static String joinGame(String gameCode, String playerName) {
        //TODO: should players be identified by something outside of name? Potentially vulnerable to cheating.
        return null;
    }

    /**
     * Player
     * Given a player name and game code, returns the role of that player.
     * @param gameCode The code of the game that the player is in.
     * @param playername The name of the player requesting their role.
     * @return A string that describes the player's role.
     */
    public static String getRole(String gameCode, String playername) {
        return "Villager";
    }

    /**
     * Server
     * Generates roles for a game.
     * @return An array of roles.
     */
    private static String[] generateRoles() {
        //TODO: Modify for number of players, modify for unique game settings?
        return null;
    }
}
