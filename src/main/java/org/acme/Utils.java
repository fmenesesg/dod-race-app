package org.acme;

import io.smallrye.mutiny.Multi;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

import static java.util.Collections.unmodifiableList;

final class Utils {
    public static final List<String> NAMES;

    static  {
        try(final InputStream nameInputStream = Utils.class.getClassLoader().getResourceAsStream("names")) {
            if (nameInputStream == null) {
                throw new IOException("names list not found");
            }
            try(BufferedReader reader = new BufferedReader(new InputStreamReader(nameInputStream))) {
                final List<String> names = new ArrayList<>();
                while(reader.ready()) {
                    names.add(reader.readLine());
                }
                NAMES = unmodifiableList(names);
            }

        } catch (IOException e) {
            throw new IllegalStateException("Error while loading name list", e);
        }
    }

    public static String getNameById(int id) {
        // Static name table: wrap so high counters / reconnects stay within the list.
        // Supports large concurrent demos (100+ users) without exhausting the table.
        if (NAMES.isEmpty()) {
            throw new IllegalStateException("names list is empty");
        }
        final int idx = Math.floorMod(id, NAMES.size());
        return NAMES.get(idx);
    }

    static <T> Multi<T> withPing(Multi<T> stream, T pingValue, long intervalSeconds) {
        return Multi.createBy().merging()
                .streams(
                        stream,
                        Multi.createFrom().ticks().every(Duration.ofSeconds(intervalSeconds))
                                .onOverflow().drop()
                                .onItem().transform(x -> pingValue)
                );
    }
}
