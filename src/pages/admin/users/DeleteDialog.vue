<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import axios from '@/lib/axios';
import { User } from '@/types';
import { ref, watch } from 'vue';

const user = defineModel<User>();
const open = ref<boolean>(!!user.value);

const emit = defineEmits<{
    onSuccess: [message: string];
    onError: [message: string];
}>();

const onOpenChange = (value: boolean) => {
    if (!value) {
        user.value = undefined;
    }
};

const confirmDelete = () => {
    if (!user.value) return;

    axios
        .delete(`/api/users/${user.value.id}`)
        .then((res) => {
            emit('onSuccess', res.data.message);
        })
        .catch((err) => {
            if (err.response.status !== 403) throw err;

            emit('onError', err.response.data.message);
        })
        .finally(() => {
            user.value = undefined;
        });
};

watch(user, () => {
    open.value = !!user.value;
});
</script>

<template>
    <Dialog v-model:open="open" @update:open="onOpenChange">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Konfirmasi Hapus</DialogTitle>
            </DialogHeader>
            <DialogDescription>
                <p>Apakah anda yakin ingin menghapus data ini?</p>
            </DialogDescription>
            <DialogFooter>
                <DialogClose as-child>
                    <Button variant="secondary">Tutup</Button>
                </DialogClose>
                <Button variant="destructive" @click="confirmDelete">Hapus</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
